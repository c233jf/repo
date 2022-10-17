const TokenKey = 'Admin-Token'

function getToken() {
  return localStorage.getItem(TokenKey) ?? ''
}

function setToken(token: string) {
  localStorage.setItem(TokenKey, token)
}

function removeToken() {
  localStorage.removeItem(TokenKey)
}

export { getToken, setToken, removeToken }
