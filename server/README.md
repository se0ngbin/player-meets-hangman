# Database configuration

Install posgrsql and create a database named DatingHangman.
Run ./create_database.sql script on the database to create or reset the tables
schema

To connect to the db change the connectionString with your credentials in
constants.js

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
        status: int,

        // in case of status OK
        id: UUID
    }
