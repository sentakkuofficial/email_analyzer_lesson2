#Age Verifier for IMAX Movie

#ython# IMAX Movie Age Verifier

print(" Welcome to IWorld Cinema!")
print("--------------------------------")

movie = "Dune: Part Two"
age_limit = 13

name = input("Enter your name: ")
age = int(input("Enter your age: "))

if age >= 18:
    print(" Welcomein IMAX!")
elif age >= 13:
    print("Welcome You can watch  but must be accompanied by an adult. 👨‍👩‍👧")
elif age >= 5:
    print("Sorry you cannot enter the movie")
else:
    print("Sorry You are not old enough to enter the cinema.")

print("Thank you for visiting IMAX Cinema!")