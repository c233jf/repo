export const useUserStore = defineStore('user', () => {
  const permissionStore = usePermissionStore()

  let token = getToken()
  const name = ref('')
  const avatar = ref('')
  const introduction = ref('')
  const roles = ref<string[]>([])

  const storeLogin = async ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => {
    const {
      data: { data },
    } = await login({
      username: username.trim(),
      password,
    })
    if (data) {
      token = data.token
      setToken(data.token)
      request.defaults.headers.common['X-Token'] = data.token
    }
  }

  const getInfo = async () => {
    if (token) {
      request.defaults.headers.common['X-Token'] = token
    }

    const {
      data: { data },
    } = await getUserInfo()

    if (!data) {
      throw new Error('Verification failed, please Login again.')
    }

    // roles must be a non-empty array
    if (!data.roles || data.roles.length === 0) {
      throw new Error('getUserInfo: roles must be a non-null array!')
    }

    roles.value = data.roles
    name.value = data.name
    avatar.value = data.avatar
    introduction.value = data.introduction
    return data
  }

  const storeLogout = async () => {
    await logout()
    resetToken()
    permissionStore.removeRoutes()
  }

  const resetToken = () => {
    token = ''
    roles.value = []
    removeToken()
    delete request.defaults.headers.common['X-Token']
  }

  return {
    token,
    name,
    avatar,
    introduction,
    roles,
    login: storeLogin,
    getInfo,
    logout: storeLogout,
    resetToken,
  }
})
