/**
 * Copyright 2023 <Hardworking Bee>
 */

#include <string.h>

#include <iostream>

using std::cout;

int main() {
  // #region first
  const char* str1 = "hello";
  cout << strlen(str1) << '\n';  // 5
  cout << sizeof("hello") << '\n';  // 6，这里多出的字节是 '\0'，字符串的结束符
  // #endregion first

  // #region second
  // 以下 3 种方式等价
  char str2[]{'h', 'e', 'l', 'l', 'o', '\0'};
  char str3[] = {'h', 'e', 'l', 'l', 'o', '\0'};

  // 因为数组变量本质是指向数组首元素的指针，所以我们可以这样写
  char str4[] = "hello";
  // #endregion second

  return 0;
}
