import express from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import pg from 'pg';
import { connectionString } from '../constants.js';

const router = express.Router();
const pgPool = new pg.Pool({ connectionString });

// internal functions

function requireProperties(obj, props) {
    for (let prop of props) {
        if (! obj.hasOwnProperty(prop)) 
            throw createError(400, `Missing required property '${prop}'`);
    }
}

// public functions

export const createLogin = asyncHandler(async (req, res) => {
    requireProperties(req.body, ['username', 'password']);

    const { username, password } = req.body;

    // const query = {
    //     name: 'create-login',
    //     text: 'INSERT INTO LoginInfo (username, passwordhash) values ($1, $2)',
    //     values: [username, pwhash]
    // };

    res.status(200).json(req.body);
})

export default router;
