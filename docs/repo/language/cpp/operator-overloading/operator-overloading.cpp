/**
 * Copyright 2023 <Hardworking Bee>
 */

#include <iostream>

using std::cin;
using std::cout;

class Point {
  friend const Point operator+(const Point&, const Point&);
  friend std::ostream& operator<<(std::ostream&, const Point&);
  friend std::istream& operator>>(std::istream&, Point&);

 private:
  int x_;
  int y_;

 public:
  Point(int x, int y);
  ~Point();

  const Point operator-(const Point& p) const {
    return Point(x_ - p.x_, y_ - p.y_);
  }

  Point& operator+=(const Point& p) {
    x_ += p.x_;
    y_ += p.y_;
    return *this;
  }

  const Point operator-() const { return Point(-x_, -y_); }

  // 前置 ++
  Point& operator++() {
    ++x_;
    ++y_;
    return *this;
  }

  // 后置 ++
  const Point operator++(int) {
    Point old = *this;
    ++(*this);
    return old;
  }

  void Display() { cout << "x: " << x_ << ", y: " << y_ << '\n'; }
};

Point::Point(int x, int y) : x_(x), y_(y) {}

Point::~Point() {}

const Point operator+(const Point& p1, const Point& p2) {
  return Point(p1.x_ + p2.x_, p1.y_ + p2.y_);
}

std::ostream& operator<<(std::ostream& os, const Point& p) {
  os << "x: " << p.x_ << ", y: " << p.y_;
  return os;
}

std::istream& operator>>(std::istream& is, Point& p) {
  is >> p.x_ >> p.y_;
  return is;
}

int main() {
  Point p1(1, 2);
  Point p2(3, 4);
  Point p3 = p1 + p2;
  p3.Display();

  Point p4 = p1 - p2;
  p4.Display();

  Point p5(5, 6);
  p5 += p1;
  p5.Display();

  Point p6 = -p5;
  p6.Display();

  Point p7(7, 8);
  ++p7;
  p7.Display();

  Point p8(9, 10);
  p8++;
  p8.Display();

  cout << p8 << '\n';

  Point p9(0, 0);
  cin >> p9;
  cout << p9 << '\n';

  return 0;
}
