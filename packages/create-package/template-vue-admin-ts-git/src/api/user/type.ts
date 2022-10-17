import { Basic } from '../types/basic'

interface LoginPost {
  username: string
  password: string
}

interface LoginResponse extends Basic {
  data?: { token: string }
}

interface UserInfoResponseBody {
  roles: string[]
  name: string
  avatar: string
  introduction: string
}

interface UserInfoResponse extends Basic {
  data?: UserInfoResponseBody
}

export type { LoginPost, LoginResponse, UserInfoResponse, UserInfoResponseBody }
