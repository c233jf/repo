export function useApiLoading(api?: () => Promise<any>) {
  const loading = ref(false)

  return { loading }
}
