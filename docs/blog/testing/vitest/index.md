---
prev: false
next: false
---

# 测试

自动化测试是软件开发的重要组成部分。其能够预防无意引入的 bug 并鼓励开发者将应用分解为可测试、可维护的函数、模块、类和组件。有助于确保发布符合质量和性能的产品。这能够帮助你和你的团队更快速、自信地构建复杂的应用。与任何应用一样，新的应用可能会以多种方式崩溃，因此，在发布前发现并解决这些问题就变得十分重要。

## 使用 Vitest 作为 Nestjs 测试框架

### 安装依赖

::: code-group

```sh [npm]
npm i -D @nestjs/testing vitest unplugin-swc @swc/core @faker-js/faker
```

```sh [yarn]
yarn add -D @nestjs/testing vitest unplugin-swc @swc/core @faker-js/faker
```

```sh [pnpm]
pnpm add -D @nestjs/testing vitest unplugin-swc @swc/core @faker-js/faker
```

:::

### 创建测试配置

在项目根目录下创建 `vitest.config.ts`

```ts
import { configDefaults, defineConfig } from 'vitest/config'
import swc from 'unplugin-swc'

export default defineConfig({
  test: {
    include: [...configDefaults.include, '**/*.e2e-spec.ts'],
    globals: true, // 使用全局 API，需要在 tsconfig 中引入 vitest/globals 类型
  },
  plugins: [swc.vite()],
})
```

创建 `tsconfig.json`

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "types": ["vitest/globals"],
    "target": "esnext" // unplugin-swc 只支持小写
  }
}
```

::: warning
如果出现 `Error: Dynamic require of "path" is not supported` 错误，需要移除 `package.json` 中 `"type": "module"` 选项。`unplugin-swc` 对 `esm` 的支持仍不完善。
:::

### 创建测试用例

假设我们现在有一个 `users` module，在该 module 下，我们有 `users.controller.ts`

```ts
import { Controller, Get, Post, Body } from '@nestjs/common'

import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { CheckPolicies } from '../decorators/check-policies.decorator'
import { handleUsersCreatePolicy } from './policies/users.create'
import { handleUsersReadPolicy } from './policies/users.read'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @CheckPolicies(handleUsersCreatePolicy)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @CheckPolicies(handleUsersReadPolicy)
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @CheckPolicies(handleUsersReadPolicy)
  findOne(@Param('id') id: number) {
    return this.usersService.findOne({ id })
  }
}
```

以及 `users.service.ts`

```ts
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { genSalt, hash } from 'bcrypt'
import { FindOptionsWhere, Repository } from 'typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await genSalt()
    const passwordHash = await hash(createUserDto.password, salt)
    return this.usersRepository.save({
      ...createUserDto,
      password: passwordHash,
    })
  }

  findAll() {
    return this.usersRepository.find({
      relations: {
        claims: true,
      },
    })
  }

  findOne(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
    return this.usersRepository.findOne({
      where,
      relations: {
        claims: true,
      },
    })
  }
}
```

现在我们来为这两个文件编写测试用例。

首先，我们为接下来要编写的两个测试用例编写一个 `mocker` 文件。

`user.ts`

```ts
import { faker } from '@faker-js/faker'
import { InjectionToken } from '@nestjs/common'
import { FindManyOptions, FindOneOptions } from 'typeorm'

import { User } from '../../src/users/entities/user.entity'

export function createRandomUser() {
  return {
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    username: faker.internet.userName(),
  }
}

export const createUserDto = createRandomUser()
export let passwordHash = ''

export const users = faker.helpers.multiple(createRandomUser)
export const usersWithId = users.map(
  (e, index) =>
    new User({
      ...e,
      id: index + 1,
      createdAt: '',
      updatedAt: '',
    })
)

export function userRepositoryMocker(token?: InjectionToken) {
  if (token === 'UserRepository') {
    return {
      save: vi.fn<[User], User>().mockImplementation((data) => {
        passwordHash = data.password
        return new User({
          ...data,
          id: 1,
          createdAt: '',
          updatedAt: '',
        })
      }),
      find: vi
        .fn<[FindManyOptions<User> | undefined], User[]>()
        .mockImplementation(() => usersWithId),
      findOne: vi.fn<[FindOneOptions<User>], User | null>().mockImplementation(
        ({ where }) =>
          usersWithId.find((user) => {
            if (Array.isArray(where)) {
              const keys = where.map((e) => Object.keys(e) as (keyof User)[])
              return keys.some((k, index) =>
                k.every((e) => where[index][e] === user[e])
              )
            } else if (where) {
              const keys = Object.keys(where) as (keyof User)[]
              return keys.every((k) => where[k] === user[k])
            }
          }) ?? null
      ),
    }
  }
}
```

接下来，我们在测试用例文件中引入上述代码。

`users.service.spec.ts`

```ts
import { Test } from '@nestjs/testing'

import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import {
  createUserDto,
  passwordHash,
  userRepositoryMocker,
  users,
  usersWithId,
} from '../../utils/mocks/user'

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService],
    })
      .useMocker(userRepositoryMocker)
      .compile()

    service = module.get(UsersService)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    test('should return user instance', async () => {
      expect(await service.create(createUserDto)).toBeInstanceOf(User)

      expect(await service.create(createUserDto)).toEqual(
        new User({
          ...createUserDto,
          password: passwordHash,
          id: 1,
          createdAt: '',
          updatedAt: '',
        })
      )
    })
  })

  describe('findAll', () => {
    test('should return user array', async () => {
      expect(await service.findAll()).toEqual(
        users.map(
          (e, index) =>
            new User({
              ...e,
              id: index + 1,
              createdAt: '',
              updatedAt: '',
            })
        )
      )
    })
  })

  describe('findOne', () => {
    test('should return an user', async () => {
      expect(await service.findOne({ id: 1 })).toEqual(usersWithId[0])
    })

    test('should return null', async () => {
      expect(await service.findOne({ id: 14141414 })).toBeNull()
    })
  })
})
```

`users.controller.spec.ts`

```ts
import { Test } from '@nestjs/testing'

import { UsersController } from './users.controller'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'
import {
  createUserDto,
  passwordHash,
  userRepositoryMocker,
  users,
  usersWithId,
} from '../../utils/mocks/user'

describe('UsersController', () => {
  let controller: UsersController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .useMocker(userRepositoryMocker)
      .compile()

    controller = module.get(UsersController)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    test('should return user instance', async () => {
      expect(await controller.create(createUserDto)).toBeInstanceOf(User)

      expect(await controller.create(createUserDto)).toEqual(
        new User({
          ...createUserDto,
          password: passwordHash,
          id: 1,
          createdAt: '',
          updatedAt: '',
        })
      )
    })
  })

  describe('findAll', () => {
    test('should return user array', async () => {
      expect(await controller.findAll()).toEqual(
        users.map(
          (e, index) =>
            new User({
              ...e,
              id: index + 1,
              createdAt: '',
              updatedAt: '',
            })
        )
      )
    })
  })

  describe('findOne', () => {
    test('should return an user', async () => {
      expect(await controller.findOne(1)).toEqual(usersWithId[0])
    })

    test('should return null', async () => {
      expect(await controller.findOne(14141414)).toBeNull()
    })
  })
})
```

## Referencs

- [Nest + SWC](https://docs.nestjs.com/recipes/swc#vitest)
- [@nestjs/testing doesn't work with vitest](https://github.com/nestjs/nest/issues/9228)
- [Error: Dynamic require of "path" is not supported](https://github.com/egoist/unplugin-swc/issues/30)
