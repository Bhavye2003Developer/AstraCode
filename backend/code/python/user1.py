def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)

num = 100  # You can increase this number for more computation
result = factorial(num)
print(f"The factorial of {num} is: {result}")
