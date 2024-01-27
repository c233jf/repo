/**
 * Copyright 2023 <Hardworking Bee>
 */

#include <iostream>
#include <stdexcept>

class divide_error : public std::runtime_error {
 public:
  explicit divide_error(const std::string& msg) : std::runtime_error(msg) {}
};

class divide_by_zero : public divide_error {
 public:
  divide_by_zero() : divide_error("attempted to divide by zero") {}
};

int Divide(int a, int b) throw(divide_by_zero) {
  if (b == 0) {
    throw divide_by_zero();
  }
  return a / b;
}

int main() {
  try {
    Divide(1, 0);
  } catch (const divide_by_zero& e) {
    std::cerr << e.what() << '\n';
    return -1;
  }

  return 0;
}
