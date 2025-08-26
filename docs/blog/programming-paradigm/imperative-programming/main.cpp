// go:build ignore
//  +build ignore

#include <iostream>

int main() {
  int arr[] = {1, 4, 3, 6, 7, 8, 9, 2};
  int result[4];
  int result_count = 0;

  for (int i = 7; i >= 0; i--) {
    if (arr[i] > 5)
      result[result_count++] = arr[i];
  }

  for (const auto &i : result) {
    std::cout << i << " "; // 9 8 7 6
  }
  std::cout << std::endl;

  return 0;
}