
email = input("Enter your email: ")


print("Original Email:", email)


parts = email.split("@")
print("Split Parts:", parts)


print("Username:", parts[0])
print("Domain:", parts[1])
