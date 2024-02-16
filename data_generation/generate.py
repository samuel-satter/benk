import csv
from faker import Faker
import random
import bcrypt
from datetime import datetime, timedelta

#this is used to generate a dataset with random accounts

fake = Faker()

def generate_user():
    isAdmin = random.choices([0, 1], weights=[98, 2])[0]
    firstName = fake.first_name()
    lastName = fake.last_name()
    pw = fake.password()
    hashed_pw = bcrypt.hashpw(pw.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    email = fake.email()
    phoneNumber = fake.phone_number()
    origin = fake.country()
    accountNumber = fake.iban()
    balance = round(random.uniform(1000, 100000), 2)
    status = random.choices([0, 1], weights=[5, 95])[0]
    createdAt = fake.date_time_this_decade()
    updatedAt = createdAt + timedelta(days=random.randint(1, 30))
    
    return [isAdmin, firstName, lastName, hashed_pw, email, phoneNumber, origin, 
            accountNumber, balance, status, createdAt, updatedAt]
    
with open('mock_user_data.csv', 'w', newline='') as csvfile:
    fieldnames = ['isAdmin', 'firstName', 'lastName', 'pw', 'email', 'phoneNumber', 'origin', 
            'accountNumber', 'balance', 'status', 'createdAt', 'updatedAt']
    writer = csv.writer(csvfile)
    writer.writerow(fieldnames)
    
    for _ in range (200):
        user_data = generate_user()
        writer.writerow(user_data)
        
#LOAD DATA local INFILE 'C:\Users\samue\Documents\dumps\mock_user_data.csv'
#INTO TABLE users
#FIELDS terminated by ','
#LINES TERMINATED BY '\n'
#ignore 1 rows 
#(id, isAdmin, firstName, lastName, password, email, phoneNumber, origin, accountNumber, balance, createdAt, updatedAt);