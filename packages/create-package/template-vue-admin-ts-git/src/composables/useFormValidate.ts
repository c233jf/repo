import type { Ref } from 'vue'
import type { FormInstance } from 'element-plus'

export function useFormValidate(func: () => void): {
  formRef: Ref<FormInstance | undefined>
  validate: () => void
} {
  const formRef = ref<FormInstance>()

  const validate = () => {
    formRef.value?.validate((valid) => {
      if (valid) {
        func()
      }
    })
  }

  return { formRef, validate }
}
