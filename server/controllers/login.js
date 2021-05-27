import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import pg from 'pg';
import { connectionString, saltRounds } from '../constants.js';

const router = express.Router();
const pgPool = new pg.Pool({ connectionString });

// internal functions

function requireProperties(obj, props) {
    for (let prop of props) {
        if (! obj.hasOwnProperty(prop)) 
            throw createError(400, `Missing required property '${prop}'`);
    }
}

async function getLogin(username) {
    const query = {
        name: 'get-login-by-username',
        text: 'SELECT * from LoginInfo WHERE username = $1',
        values: [username]
    };

    return await pgPool.query(query);
}

// public functions

export const createLogin = asyncHandler(async (req, res) => {
    requireProperties(req.body, ['username', 'password']);

    // check so user is not in database already

    const { username, password } = req.body;
    const pwhash = await bcrypt.hash(password, saltRounds);

    const query = {
        name: 'create-login',
        text: 'INSERT INTO "LoginInfo" (username, passwordhash) values ($1, $2)',
        values: [username, pwhash]
    };

    res.status(200).json({
        response: await pgPool.query(query)
    });
});

export const login = asyncHandler(async (req, res) => {
    requireProperties(req.body, ['username', 'password']);

    const { username, password } = req.body;

    const user = getLogin(username);
    // todo 

    res.status(200).json(user);
});

export default router;
