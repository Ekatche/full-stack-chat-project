https://www.youtube.com/watch?v=J4RPbOuY9oI&list=PLOLrQ9Pn6cawHF2lVl9goEm9Ta3rlutPD&index=36

# create venv
python3 -m venv chatvenv
# activate venv 
- source chatvenv/bin/activate
# project structure 

- basic django projet structure provided on the website but the perfect project can be changed depending on your team and the nature of your project  

# configure env variable 
separate sensitive data from code base 

# Linting and formating 
important to assure readability and maintainability of yor code 

# admin user 
user:admin
password:adminpass

# Class based views or function based views 
up to you, what you want to use and how you want to use tham 
viewset = class, performs crud operation and bridge btw auery and serializer
serializer--> convert django models datatype to Json or other format usable by the frontend 

# React frontend with Vite