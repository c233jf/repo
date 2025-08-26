arr = [1, 4, 3, 6, 7, 8, 9, 2]
result: list[int] = []

for i in range(len(arr) - 1, -1, -1):
    if arr[i] > 5:
        result.append(arr[i])

print(result)  # [9, 8, 7, 6]
