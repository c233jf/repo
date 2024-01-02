/**
 * Copyright 2023 <Hardworking Bee>
 */

#include <iostream>
#include <string>
#include <vector>

using std::cout;
using std::string;
using std::vector;

int main() {
  vector<string> msg{"Hello", "C++",     "World",
                     "from",  "VS Code", "and the C++ extension!"};

  for (const string& word : msg) {
    cout << word << " ";
  }
  cout << '\n';
}
