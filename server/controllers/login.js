import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import pg from 'pg';
import jwt from 'jsonwebtoken'

import { StatusCodes } from 'http-status-codes';
import { connectionString, saltRounds } from '../constants.js';
import { jwtKey } from '../secret.js';

const router = express.Router();
const pgPool = new pg.Pool({ connectionString });

// internal functions

function requireProperties(obj, props) {
    for (let prop of props) {
        if (! obj.hasOwnProperty(prop)) 
            throw createError(StatusCodes.BAD_REQUEST, `Missing required property '${prop}'`);
    }
}

// returns a user login object or null
//
async function getLogin(username) {
    const query = {
        name: 'get-login-by-username',
        text: 'SELECT * from "LoginInfo" WHERE username = $1',
        values: [username]
    };

    let user = await pgPool.query(query);
    return user.rowCount == 1 ? user.rows[0] : null;
}

// public functions

export const createLogin = asyncHandler(async (req, res) => {
    requireProperties(req.body, ['username', 'password']);

    const { username, password } = req.body;
    const pwhash = await bcrypt.hash(password, saltRounds);

    const query = {
        name: 'create-login',
        text: 'INSERT INTO "LoginInfo" (username, passwordhash) values ($1, $2)',
        values: [username, pwhash]
    };

    await pgPool.query(query)
    const user = await getLogin(username);

    // TODO create user along with login with the same id, even if it's empty

    res.status(200).json({
        id : user.id
    });
});

export const login = asyncHandler(async (req, res) => {
    requireProperties(req.body, ['username', 'password']);

    const { username, password } = req.body;

    const user = await getLogin(username);
    if (! user) throw createError(StatusCodes.NOT_FOUND, `User '${username}' does not exist`);

    const authorized = await bcrypt.compare(password, user.passwordhash);
    if (! authorized) throw createError(StatusCodes.UNAUTHORIZED, `Invalid password, don't ever try again`);


    res.status(200).json({
        accessToken : jwt.sign({ username }, jwtKey, { expiresIn : '1d' })
    });
});

export default router;
