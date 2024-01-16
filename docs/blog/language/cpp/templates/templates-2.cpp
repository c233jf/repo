/**
 * Copyright 2023 <Hardworking Bee>
 */

#include <iostream>

using std::cout;

template <typename T>
class Array {
  template <typename T>
  friend std::ostream& operator<<(std::ostream&, const Array<T>&);

 private:
  T* data_;
  // 元素个数
  int size_{0};
  // 容量
  int capacity_;

 public:
  explicit Array(int capacity = 0) {
    capacity_ = capacity > 0 ? capacity : 1;
    data_ = new T[capacity_];
  }

  ~Array() {
    if (data_ == nullptr) return;
    delete[] data_;
  }

  T& operator[](int index) {
    if (index < 0 || index >= capacity_)
      throw std::out_of_range("index out of range");
    return data_[index];
  }

  int size() const { return size_; }

  int capacity() const { return capacity_; }

  T& Push(T value) {
    if (size_ < capacity_) {
      data_[size_++] = value;
      return data_[size_ - 1];
    }

    int* new_data = new T[capacity_ + 1];
    for (int i = 0; i < capacity_; ++i) {
      new_data[i] = data_[i];
    }
    new_data[capacity_] = value;
    delete[] data_;
    data_ = new_data;
    ++size_;
    ++capacity_;
    return data_[capacity_ - 1];
  }
};

template <typename T>
std::ostream& operator<<(std::ostream& os, const Array<T>& arr) {
  os << '[';
  int last_idx = arr.size() - 1;
  for (int i = 0; i < last_idx; ++i) {
    os << arr.data_[i] << ", ";
  }
  os << arr.data_[last_idx] << ']';
  return os;
}

int main() {
  Array<int> arr(10);
  for (int i = 0; i < 10; ++i) {
    arr.Push(i);
  }
  for (int i = 0; i < 10; ++i) {
    cout << arr[i] << '\n';
  }
  cout << arr << '\n';
  return 0;
}
