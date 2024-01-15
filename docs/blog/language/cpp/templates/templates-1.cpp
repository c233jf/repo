/**
 * Copyright 2023 <Hardworking Bee>
 */
#include <iostream>

using std::cout;

// 约定俗成，模板类型参数通常用单个大写字母表示。
template <typename T>
T add(T a, T b) {
  return a + b;
}

int main() {
  // 编译器会根据参数类型自动推导出模板参数类型。
  cout << add(1, 2) << '\n';
  cout << add(1.1, 2.2) << '\n';

  // 也可以显式指定模板参数类型。
  cout << add<int>(1, 2) << '\n';
  cout << add<double>(1.1, 2.2) << '\n';

  return 0;
}
