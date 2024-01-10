/**
 * Copyright 2023 <Hardworking Bee>
 */

#include <iostream>

using std::cout;

class Sum {
 private:
  int x_;
  int y_;

 public:
  int operator()(int x, int y) {
    x_ = x;
    y_ = y;
    return x_ + y_;
  }
};

int main() {
  Sum sum;
  cout << sum(1, 2) << '\n';

  return 0;
}
