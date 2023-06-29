export type Effect = () => void

export let activeEffect: Effect | null

export function watchEffect(effect: Effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}
