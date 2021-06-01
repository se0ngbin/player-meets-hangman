import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import pg from 'pg';
import jwt from 'jsonwebtoken'

import { StatusCodes } from 'http-status-codes';
import { connectionString, saltRounds } from '../constants.js';
import { jwtKey } from '../secret.js';
import { requireProperties } from '../utils.js';

const pgPool = new pg.Pool({ connectionString });

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

    const client = await pgPool.connect();
    
    let userid;
    try {
        await client.query('BEGIN');

        const query_insert_login = {
            name: 'create-login',
            text: 'INSERT INTO "LoginInfo" (username, passwordhash) values ($1, $2) returning id',
            values: [username, pwhash]
        };
        const res = await client.query(query_insert_login);
        userid = res.rows[0].id;

        const query_insert_user = {
            name: 'create-user',
            text: 'INSERT INTO "User" (id) values ($1)',
            values: [userid]
        };

        await client.query(query_insert_user);
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }

    res.status(200).json({
        id : userid
    });
});

export const login = asyncHandler(async (req, res) => {
    requireProperties(req.body, ['username', 'password']);

    const { username, password } = req.body;

    const user = await getLogin(username);
    if (! user) throw createError(StatusCodes.NOT_FOUND, `User '${username}' does not exist`);

    const authorized = await bcrypt.compare(password, user.passwordhash);
    if (! authorized) throw createError(StatusCodes.UNAUTHORIZED, `Invalid password, don't ever try again`);

    const userid =  user.id;

    res.status(200).json({
        accessToken : jwt.sign({ username, userid }, jwtKey, { expiresIn : '1d' })
    });
});
