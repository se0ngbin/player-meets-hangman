# Database configuration

Install postgresql and create a database named DatingHangman.
Run ./create_database.sql script on the database to create or reset the tables
schema

Run script ./user_choices.sql to populate Interest, MakeOrBreakQuestion, and
MakeOrBreakPossible answer tables.

To connect to the db change the connectionString with your credentials in
constants.js

Add secret.js with 

    export const jwtKey = "some-secret-key";

Change the jwtKey in secret.js so it's secure.

# API routes

## Login && create user


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

## Queries that can be accessed by anybody(no login required)

User profile by id:

    GET /profile/<username>

Random user profile:

    GET /profile/random

All make or break questions:

    GET /questions

returns:
    
    [ question .. ]

    where question is:

    {
        id: UUID,
        text: string
    }

Make or break question possible answers:

    GET /questions/<question-id>/answers

returns:

    [ answer .. ]

    where answer is:

    {
        id: UUID,
        mobqid: UUID, // make or break question id
        text: string
    }

All possible intersts/hobbies that someone can select:

    GET /interests

returns:
    
    [ interest .. ]

    where interest is:

    {
        id: integer,
        text: string
    }

All possible genders that a user can choose:

    GET /genders

returns:

    [ gender .. ]

    where gender is:

    {
        id: integer, // to be used as an id when selecting a gender for a
        person, but as a binary left shift deviation for selecting multiple
        genders(genders interested in)
        text: string
    }


## Queries and updates on the user


