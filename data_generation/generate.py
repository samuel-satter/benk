import csv
from faker import Faker
import random
from datetime import datetime, timedelta

#this is used to generate a dataset with random accounts

fake = Faker()

def generate_user():
    isAdmin = random.random() < 0.02 
    firstName = fake.first_name()
    lastName = fake.last_name()
    password = fake.password()
    email = fake.email()
    phoneNumber = fake.phone_number()
    origin = fake.country()
    accountNumber = fake.iban()
    balance = round(random.uniform(1000, 100000), 2)
    status = random.choice(["ACTIVE", "INACTIVE"])
    createdAt = fake.date_time_this_decade()
    updatedAt = createdAt + timedelta(days=random.randint(1, 30))
    
    return [isAdmin, firstName, lastName, password, email, phoneNumber, origin, 
            accountNumber, balance, status, createdAt, updatedAt]
    
with open('mock_user_data.csv', 'w', newline='') as csvfile:
    fieldnames = ['isAdmin', 'firstName', 'lastName', 'password', 'email', 'phoneNumber', 'origin', 
            'accountNumber', 'balance', 'status', 'createdAt', 'updatedAt']
    writer = csv.writer(csvfile)
    writer.writerow(fieldnames)
    
    for _ in range (200):
        user_data = generate_user()
        writer.writerow(user_data)