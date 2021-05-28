# Database configuration

Install posgrsql and create a database named DatingHangman.
Run ./create_database.sql script on the database to create or reset the tables
schema

To connect to the db change the connectionString with your credentials in
constants.js

Change the jwtKey in secret.js

# API routes


Create a new login:

    POST /createLogin

body:

    {
        username: string,
        password: string
    }

returns:

    {
        id: UUID
    }



Login:
    
    POST /login

body: 

    {
        username: string,
        password: string
    }

return:

    { accessToken : jwt token }

Use accessToken in the HTTP request as a header "Authorization: Bearer $accessToken"
