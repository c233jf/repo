import type { LoginPost, LoginResponse, UserInfoResponse } from './type'
export * from './type'

function login(data: LoginPost) {
  return request.post<LoginResponse>('/vue-element-admin/user/login', data)
}

function getUserInfo() {
  return request.get<UserInfoResponse>('/vue-element-admin/user/info')
}

function logout() {
  return request.post('/vue-element-admin/user/logout')
}

export { login, getUserInfo, logout }
