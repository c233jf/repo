<template>
  <div class="form-container">
    <ElForm ref="formRef" class="form" :model="form" :rules="rules">
      <h3 class="form-title">Login Form</h3>

      <ElFormItem prop="uesrname">
        <ElInput
          v-model="form.username"
          placeholder="username"
          :prefix-icon="EpUserFilled"
          size="large"
          autofocus
        />
      </ElFormItem>
      <ElTooltip
        :visible="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <ElFormItem prop="password">
          <ElInput
            v-model="form.password"
            placeholder="Password"
            show-password
            :prefix-icon="EpLock"
            size="large"
            @blur="capsTooltip = false"
            @keyup="checkCapslock"
            @keyup.enter="validate"
          />
        </ElFormItem>
      </ElTooltip>
      <ElFormItem>
        <ElButton
          class="w-full"
          type="primary"
          :loading="loading"
          @click="validate"
          >Login</ElButton
        >
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import type { FormRules } from 'element-plus'
import EpUserFilled from '~icons/ep/user-filled'
import EpLock from '~icons/ep/lock'

import type { LoginPost } from 'api/user'

const { loading } = useApiLoading()
const userStore = useUserStore()

const form = reactive<LoginPost>({
  username: '',
  password: '',
})

const rules: FormRules = {
  username: [
    { required: true, message: 'Please enter user name', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please enter password', trigger: 'blur' },
    {
      min: 6,
      message: 'The password can not be less than 6 digits',
      trigger: 'blur',
    },
  ],
}

const capsTooltip = ref(false)

const checkCapslock = (e: KeyboardEvent) => {
  const { key } = e
  capsTooltip.value = !!(key && key.length === 1 && key >= 'A' && key <= 'Z')
}

const route = useRoute()
const router = useRouter()

const submit = async () => {
  loading.value = true
  try {
    await userStore.login(form)
    router.push({ path: (route.query.redirect as string) || '/' })
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const { formRef, validate } = useFormValidate(submit)
</script>

<style scoped>
.form {
  @apply m-auto;
  width: 520px;
  padding: 160px 35px;

  &-container {
    @apply h-full;
    background-color: #2d3a4b;
  }

  &-title {
    @apply text-2xl text-center font-bold;
    color: #eee;
    margin-bottom: 40px;
  }
}
</style>
