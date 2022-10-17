import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { router } from './router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from) => {
  // start progress bar
  NProgress.start()

  const loginRoute = { name: 'Login', query: { redirect: to.path } }

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.name === 'Login') {
      // if is logged in, redirect to the home page
      return '/'
    } else {
      const userStore = useUserStore()
      // determine whether the user has obtained his permission roles through getInfo
      if (userStore.roles.length === 0) {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await userStore.getInfo()

          // generate accessible routes map based on roles
          const permissionStore = usePermissionStore()
          const accessRoutes = permissionStore.generateRoutes(roles)

          // dynamically add accessible routes
          accessRoutes.forEach((e) => {
            permissionStore.removabledRoutes.push(router.addRoute(e))
          })
          return to.fullPath
        } catch (error) {
          // remove token and go to login page to re-login
          userStore.resetToken()
          ElMessage.error({ message: (error as string) || 'Has Error' })
          return loginRoute
        }
      }
    }
  } else {
    /* has no token*/
    if (!to.meta.whiteList) {
      // other pages that do not have permission to access are redirected to the login page.
      return loginRoute
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
