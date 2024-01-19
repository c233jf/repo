/**
 * Copyright 2023 <Hardworking Bee>
 */

void Execute(void (*p)()) { p(); }

int main() {
  // 使用变量存储 Lambda 表达式。
  // 需要注意指针类型需要对应 Lambda 表达式的返回类型和参数列表。
  void (*p)() = []() { return; };
  // 可以使用更简便的 auto 关键字。
  auto q = []() { return; };

  // 带参数和返回值的 Lambda 表达式（返回值可以省略，会自动推导）。
  auto Add = [](int a, int b) -> int { return a + b; };

  // 通常情况下，Lambda 表达式作为参数传递给函数。
  Execute([]() { return; });

  // 变量捕获（限于局部变量，全局变量不需要捕获）
  int a = 1;
  int b = 2;
  // 默认捕获
  auto AddAll = [=]() -> int { return a + b; };
  // 显式捕获 a。
  auto AddA = [a](int b) -> int { return a + b; };
  auto AddAB = [a, b]() -> int { return a + b; };
  // 上面的捕获方式都是值捕获，也就是 a 的值一直是 1，后续对 a
  // 的修改不会影响上述 Lambda 的结果。
  // 如果需要跟踪后续的值，请使用引用捕获。
  auto AddAllRef = [&]() -> int { return a + b; };
  auto AddB = [&b](int a) -> int { return a + b; };

  // mutable 关键字
  // 默认情况下，在值捕获的时候，修改捕获的变量会报错，这时可以使用 mutable
  // 关键字。注意：Lambda
  // 表达式内对捕获的变量的修改，不会影响到外部的变量，因为这是值捕获。
  auto AddAllMutable = [=]() mutable {
    a = 2;
    b = 3;
    return a + b;
  };

  // 泛型 Lambda 表达式
  auto AddAllGeneric = [](auto a, auto b) { return a + b; };

  // 初始化捕获的变量
  int c;
  auto AddC = [c = 1](int a) { return a + c; };

  return 0;
}
