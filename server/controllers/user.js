import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import pg from 'pg';

import { StatusCodes } from 'http-status-codes';
import { connectionString } from '../constants.js';

const pgPool = new pg.Pool({ connectionString });

// returns a user login object or null
//
async function getProfile(username) {
    return username; // TODO
}

// public functions

export const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json(await getProfile(req.params.username));
});

export const getRandomUserProfile = asyncHandler(async (_req, res) => {
    const query = 'SELECT * FROM "LoginInfo" ORDER BY random() LIMIT 1';
    const result = await pgPool.query(query);

    if (result.rowCount != 1)
        throw createError(StatusCodes.NOT_FOUND, "No users in the database");

    res.status(StatusCodes.OK).json(await getProfile(result.rows[0].username));
});
