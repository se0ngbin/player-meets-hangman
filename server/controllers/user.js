import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import pg from 'pg';
import fs from 'fs';
import util from 'util';

import { StatusCodes } from 'http-status-codes';
import { connectionString } from '../constants.js';

const pgPool = new pg.Pool({ connectionString });
const readFile = util.promisify(fs.readFile);

// returns a user login object or null
//

async function getPhotoData_base64(path) {
    const photo_buffer = await readFile(path);
    return photo_buffer.toString('base64');
}

async function getPhotos(userid) {
    const query = {
        name: 'get-user-photos',
        text: '\
        SELECT * FROM "Photo" \
        WHERE userid = $1 \
        ',
        values: [userid]
    };
    const query_result = await pgPool.query(query);
    const photos = query_result.rows;

    return photos.map((acc, photo) => {
        acc.push({ id: photo.id, data: getPhotoData_base64(photo.path) });
        return acc;
    }, []);
}

async function getProfile(username) {
    const users_query = {
        name: 'get-users-by-username',
        text: '\
        SELECT "User".id, username, name, birthdate, bio, gender, gendersinterestedin \
        FROM "LoginInfo" INNER JOIN "User" on "LoginInfo".id = "User".id \
        WHERE username = $1 \
        ',
        values: [username]
    };
    const users_result = await pgPool.query(users_query);
    if (users_result.rowCount == 0) 
        throw createError(StatusCodes.NOT_FOUND, `User "${username}" does not exist`);

    const user = users_result.rows[0];

    const interests_query = {
        name: 'get-user-interests',
        text: '\
        SELECT "Interest".id, "Interest".name \
        FROM "Interest" INNER JOIN "UserInterest" ON "Interest".id = "UserInterest".interestid \
        INNER JOIN "User" on "User".id = "UserInterest".userid \
        WHERE "User".id = $1 \
        ',
        values: [user.id]
    }
    const interests_result = await pgPool.query(interests_query);

    user.interests = interests_result.rows;

    const questions_answers_query = {
        name: 'get-user-questions-answers-responded',
        text: '\
        SELECT ua.mobqid, mobqpaid, q.text as qtext, a.text as atext \
        FROM "MakeOrBreakUserAnswer" as ua \
        INNER JOIN "User" as u on u.id = ua.userid \
        INNER JOIN "MakeOrBreakQuestion" as q on q.id = ua.mobqid \
        INNER JOIN "MakeOrBreakPossibleAnswer" as a on a.id = ua.mobqpaid \
        WHERE u.id = $1 \
        ',
        values: [user.id]
    }
    const questions_result = await pgPool.query(questions_answers_query);

    const grouped_question_answers = questions_result.rows.map((acc, row) => {
        if (! acc.hasOwnProperty(row.mobqid)) {
            acc[row.mobqid] = { id: row.mobqid, text: row.qtext, answers: [] };
        }

        acc[row.mobqid].answers.push({ id: row.mobqpaid, text: row.atext });
        return acc;
    }, {});

    user.questions_answers = grouped_question_answers;
    user.photos = await getPhotos(user.id);

    return user;
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
