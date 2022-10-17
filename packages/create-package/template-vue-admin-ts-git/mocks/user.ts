import { rest } from 'msw'

import { BasicResponseBody } from './type'

interface LoginPostRequestBody {
  username: string
  password: string
}

interface LoginPostResponseBody extends BasicResponseBody {
  data: { token: string }
}

interface UserInfoResponseBodyData {
  roles: string[]
  name: string
  avatar: string
  introduction: string
}

interface UserInfoResponseBody extends BasicResponseBody {
  data: UserInfoResponseBodyData
}

const tokens: Record<string, { token: string }> = {
  admin: {
    token: 'admin-token',
  },
  editor: {
    token: 'editor-token',
  },
}

const users: Record<string, UserInfoResponseBodyData> = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
  },
}

export const userHandlers = [
  // login
  rest.post('/dev-api/vue-element-admin/user/login', async (req, res, ctx) => {
    const { username } = await req.json<LoginPostRequestBody>()
    const token = tokens[username]

    // mock error
    if (!token) {
      return res(
        ctx.status(403),
        ctx.json<BasicResponseBody>({
          code: 60204,
          msg: 'Account and password are incorrect.',
        })
      )
    }
    return res(
      ctx.status(200),
      ctx.json<LoginPostResponseBody>({
        code: 20000,
        data: token,
      })
    )
  }),

  // get user info
  rest.get('/dev-api/vue-element-admin/user/info', (req, res, ctx) => {
    const token = req.headers.get('X-Token') ?? ''
    const info = users[token]

    // mock error
    if (!info) {
      return res(
        ctx.status(404),
        ctx.json<BasicResponseBody>({
          code: 50008,
          msg: 'Login failed, unable to get user details.',
        })
      )
    }
    return res(
      ctx.status(200),
      ctx.json<UserInfoResponseBody>({
        code: 20000,
        data: info,
      })
    )
  }),

  // logout
  rest.post('/dev-api/vue-element-admin/user/logout', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<BasicResponseBody>({
        code: 20000,
      })
    )
  }),
]
