def reverse(text: str) -> str:
    return text[::-1]


def is_palindrome(text: str) -> bool:
    return text == reverse(text)


def main():
    text = input("Enter a text: ")
    print(reverse(text))
    if is_palindrome(text):
        print("Yes, it is a palindrome")
    else:
        print("No, it is not a palindrome")


if __name__ == "__main__":
    main()
