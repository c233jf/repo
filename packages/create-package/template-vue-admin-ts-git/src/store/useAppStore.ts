export const useAppStore = defineStore(
  'app',
  () => {
    const size = ref('')

    const sidebar = reactive({
      opened: true,
      withoutAnimation: false,
    })
    const device = ref<'mobile' | 'desktop'>('desktop')

    return { sidebar, device, size }
  },
  { persist: { paths: ['size', 'sidebar'] } }
)
