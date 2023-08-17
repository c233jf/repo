# 在 CI/CD 中使用 Aliyun ECS 云助手

## 创建 Python 脚本用以运行 ECS 命令

1. 运行 `pip install --upgrade pip setuptools wheel` 更新相关工具到最新版本，否则后续安装可能会报错
2. 运行 `pip install aliyun-python-sdk-ecs` 安装 Aliyun sdk
3. 在项目根目录下创建 `scripts/ecs-task.py`，内容如下：

```python
from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.acs_exception.exceptions import ClientException
from aliyunsdkcore.acs_exception.exceptions import ServerException
from aliyunsdkecs.request.v20140526.RunCommandRequest import RunCommandRequest
from aliyunsdkecs.request.v20140526.DescribeInvocationResultsRequest import DescribeInvocationResultsRequest
import json
import sys
import base64
import time
import logging

# Configure the log output formatter
logging.basicConfig(level=logging.INFO,
                    format="%(asctime)s %(name)s [%(levelname)s]: %(message)s",
                    datefmt='%m-%d %H:%M')

logger = logging.getLogger()

access_key = sys.argv[1]  # 设置您的AccessKey ID
access_key_secret = sys.argv[2]  # 设置您的AccessKey Secret
region_id = sys.argv[3]  # 实例所属地域ID
ins_id = sys.argv[4]  # 实例ID


client = AcsClient(access_key, access_key_secret, region_id)


def base64_decode(content, code='utf-8'):
    if sys.version_info.major == 2:
        return base64.b64decode(content)
    else:
        return base64.b64decode(content).decode(code)


def get_invoke_result(invoke_id):
    request = DescribeInvocationResultsRequest()
    request.set_accept_format('json')

    request.set_InvokeId(invoke_id)
    response = client.do_action_with_exception(request)
    response_detail = json.loads(
        response)["Invocation"]["InvocationResults"]["InvocationResult"][0]
    status = response_detail.get("InvocationStatus", "")
    output = base64_decode(response_detail.get("Output", ""))
    return status, output


def run_command(cmdtype, cmdcontent, timeout=60):
    """
    cmdtype: 命令类型： RunBatScript;RunPowerShellScript;RunShellScript
    cmdcontent: 命令内容
    timeout: 超时设置
    """
    try:
        request = RunCommandRequest()
        request.set_accept_format('json')

        request.set_Type(cmdtype)
        request.set_CommandContent(cmdcontent)
        request.set_InstanceIds([ins_id])
        # 执行命令的超时时间，单位s,默认是60s,请根据执行的实际命令来设置
        request.set_Timeout(timeout)
        response = client.do_action_with_exception(request)
        invoke_id = json.loads(response).get("InvokeId")
        return invoke_id
    except Exception as e:
        logger.error("run command failed")


def wait_invoke_finished_get_out(invoke_id, wait_count, wait_interval):
    for i in range(wait_count):
        status, output = get_invoke_result(invoke_id)
        if status not in ["Running", "Pending", "Stopping"]:
            return status, output
        time.sleep(wait_interval)

    logger.error(
        "after wait %d times, still can not wait invoke-id %s finished")
    return "", ""


def remove_containers():
    """移除所有容器
    """
    # 设置云助手命令的命令类型
    cmdtype = "RunShellScript"
    # 设置云助手命令的命令内容
    cmdcontent = """
    #!/bin/bash
    sudo docker rm -f $(docker ps -f name=blog -q)
    """
    # 执行命令
    invoke_id = run_command(cmdtype, cmdcontent)
    log_cmd_status(invoke_id)


def remove_images():
    """移除所有镜像
    """
    # 设置云助手命令的命令类型
    cmdtype = "RunShellScript"
    # 设置云助手命令的命令内容
    cmdcontent = """
    #!/bin/bash
    sudo docker rmi -f $(docker images -f dangling=true -q)
    """
    # 执行命令
    invoke_id = run_command(cmdtype, cmdcontent)
    log_cmd_status(invoke_id)


def pull_images():
    """拉取所有镜像
    """
    # 设置云助手命令的命令类型
    cmdtype = "RunShellScript"
    # 设置云助手命令的命令内容
    cmdcontent = """
    #!/bin/bash
    sudo docker pull 镜像地址
    """
    # 执行命令
    invoke_id = run_command(cmdtype, cmdcontent)
    log_cmd_status(invoke_id, 10, 10)


def run_containers():
    """运行所有容器
    """
    # 设置云助手命令的命令类型
    cmdtype = "RunShellScript"
    # 设置云助手命令的命令内容
    cmdcontent = """
    #!/bin/bash
    sudo docker run --name blog -dp 127.0.0.1:3001:3001 镜像名称
    """
    # 执行命令
    invoke_id = run_command(cmdtype, cmdcontent)
    log_cmd_status(invoke_id)


def log_cmd_status(invoke_id, count=5, interval=5):
    """打印命令运行状态
    """
    logger.info('run command, invoke-id: %s' % invoke_id)
    # 等待命令执行完成,循环查询10次，每次间隔5秒，查询次数和间隔请根据实际情况配置
    status, output = wait_invoke_finished_get_out(invoke_id, count, interval)
    if status:
        logger.info("invoke-id execute finished,status: %s,output: %s" %
                    (status, output))


def run_task():
    remove_containers()
    pull_images()
    remove_images()
    run_containers()


if __name__ == '__main__':
    run_task()

```

## 创建 github workflows

在项目根目录下创建 `.github/workflows/deploy.yaml`，内容如下：

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

env:
  REGION_ID: cn-hongkong
  REGISTRY: registry.cn-hongkong.aliyuncs.com
  NAMESPACE: ${{ secrets.NAMESPACE }}
  ACCESS_KEY_ID: ${{ secrets.ACCESS_KEY_ID }}
  ACCESS_KEY_SECRET: ${{ secrets.ACCESS_KEY_SECRET }}
  INS_ID: ${{ secrets.INS_ID }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Login to ACR
        uses: aliyun/acr-login@v1
        with:
          login-server: ${{ env.REGISTRY }}
          username: ${{ secrets.REGISTRY_USERNAME }}
          password: ${{ secrets.REGISTRY_PASSWORD }}
      - name: Build and push blog-base image
        run: |
          docker build -t $REGISTRY/$NAMESPACE/blog-base .
          docker push $REGISTRY/$NAMESPACE/blog-base
      - name: Build and push blog-client image
        run: |
          cd apps/admin/client
          docker build -t $REGISTRY/$NAMESPACE/blog-client -f production.Dockerfile .
          docker push $REGISTRY/$NAMESPACE/blog-client
      - name: Build and push blog-server image
        run: |
          cd apps/admin/server
          docker build -t $REGISTRY/$NAMESPACE/blog-server -f production.Dockerfile .
          docker push $REGISTRY/$NAMESPACE/blog-server
      - name: Run ecs task
        run: |
          pip install --upgrade pip setuptools wheel
          pip install aliyun-python-sdk-ecs
          python3 scripts/ecs-task.py $ACCESS_KEY_ID $ACCESS_KEY_SECRET $REGION_ID $INS_ID
```
