import { consola } from 'consola'

const animal = {
  eats: true,
}
const clone = Object.create(
  Object.getPrototypeOf(animal),
  Object.getOwnPropertyDescriptors(animal),
)

consola.info(clone) // { eats: true }
// 此调用可以对 obj 进行真正准确地拷贝，包括所有的属性：
// 可枚举和不可枚举的，数据属性和 setters/getters ——
// 包括所有内容，并带有正确的 [[Prototype]]。
