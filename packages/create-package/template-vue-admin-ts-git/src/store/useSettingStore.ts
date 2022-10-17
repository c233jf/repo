import defaultSettings from '../settings'

const {
  fixedHeader,
  showSettings,
  sidebarLogo,
  tagsView,
  supportPinyinSearch,
} = defaultSettings

export const useSettingStore = defineStore(
  'setting',
  () => {
    const isFixedHeader = ref(fixedHeader)
    const settingsVisible = ref(showSettings)
    const logoVisible = ref(sidebarLogo)
    const tagsViewVisible = ref(tagsView)
    const enablePinyinSearch = ref(supportPinyinSearch)

    return {
      isFixedHeader,
      settingsVisible,
      logoVisible,
      tagsViewVisible,
      enablePinyinSearch,
    }
  },
  { persist: true }
)
