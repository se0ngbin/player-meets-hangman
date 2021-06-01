import asyncHandler from 'express-async-handler';
// import createError from 'http-errors';
import pg from 'pg';

import { StatusCodes } from 'http-status-codes';
import { connectionString } from '../constants.js';

const pgPool = new pg.Pool({ connectionString });

// public functions

export const getQuestions = asyncHandler(async (_req, res) => {
    const result = await pgPool.query('SELECT * FROM "MakeOrBreakQuestion"');
    res.status(StatusCodes.OK).json(result.rows);
});


export const getQuestionAnswers = asyncHandler(async (req, res) => {
    const result = await pgPool.query(
        'SELECT * FROM "MakeOrBreakPossibleAnswer" WHERE mobqid = $1',
        [req.params.questionId]);

    res.status(StatusCodes.OK).json(result.rows);
});

export const getInterests = asyncHandler(async (_req, res) => {
    const result = await pgPool.query('SELECT * FROM "Interest"');

    res.status(StatusCodes.OK).json(result.rows);
});

export const getGenders = asyncHandler(async (_req, res) => {
    const result = await pgPool.query('SELECT * FROM "Gender"');

    res.status(StatusCodes.OK).json(result.rows);
});
