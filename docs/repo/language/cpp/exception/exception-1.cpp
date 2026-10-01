/**
 * Copyright 2023 <Hardworking Bee>
 */

#include <iostream>
#include <limits>
#include <stdexcept>

void Test(int n) {
  if (n > std::numeric_limits<char>::max()) {
    throw std::overflow_error("n is too large");
  }
}

int main() {
  try {
    Test(1000);
  } catch (const std::overflow_error& e) {
    std::cerr << e.what() << '\n';
    return -1;
  }

  return 0;
}
