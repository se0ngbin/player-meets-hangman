import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import pg from 'pg';
import fs from 'fs';
import util from 'util';
import path from 'path';

import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import { connectionString } from '../constants.js';

const pgPool = new pg.Pool({ connectionString });
const readFile = util.promisify(fs.readFile);

// private functions

async function executeArrayQuery(qstring, getQueries, elementToValues, req, res) {
    const client = await pgPool.connect();
    let results;
    
    try {
        await client.query('BEGIN');

        const queries = getQueries(req, res).map(
            e => client.query(qstring, elementToValues(req, res, e)));
                
        results = await Promise.all(queries);

        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }

    return results;
}

// returns a user login object or null
//

async function getPhotoData(path, encoding) {
    const photo_buffer = await readFile(path);

    // console.log(photo_buffer.toString(encoding));
    return photo_buffer.toString(encoding);
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

    let result = []
    for (let photo of photos) {
        let photoData = await getPhotoData(photo.path, 'base64');

        result.push({ id: photo.id, data: photoData });
    }

    return result;
}

async function getProfile(username) {
    const users_query = {
        name: 'get-users-by-username',
        text: '\
        SELECT g1.name as owngender, g2.name as genderinterestedinn, "User".id, username, "User".name, birthdate, bio, gender, gendersinterestedin \
        FROM "LoginInfo" INNER JOIN "User" on "LoginInfo".id = "User".id \
        INNER JOIN "Gender" as g1 on g1.id = "User".gender\
        INNER JOIN "Gender" as g2 on g2.id = "User".gendersinterestedin\
        WHERE username = $1 \
        ',
        values: [username]
    };

    const users_gender_query = {
        name: 'get-users-by-username',
        text: '\
        SELECT "User".id, username, name, birthdate, bio, gender, gendersinterestedin \
        FROM "LoginInfo" INNER JOIN "User" on "LoginInfo".id = "User".id \
        INNER JOIN "Gender" on "Gender".id = "User".gender\
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

    const grouped_question_answers = questions_result.rows.reduce((acc, row) => {
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


// protected functions

// // user related

export const updateUser = asyncHandler(async (req, res) => {
    let qstring = `\
    UPDATE "User" \
    SET \
    `;

    let values = [];
    let keys = Object.keys(req.body);
    let i = 0;
    for (; i < keys.length; ++i) {
        if (i != 0)
            qstring += ', ';

        qstring += keys[i] + ` = \$${i+1}`;
        values.push(req.body[keys[i]]);
    }

    qstring += ` WHERE id = \$${i+1}`;
    values.push(res.locals.decoded.userid);
        
    await pgPool.query(qstring, values);
    
    res.status(200).json();
});

export const addUserInterests = asyncHandler(async (req, res) => {
    let qstring = `\
    INSERT INTO "UserInterest" \
    (userId, interestId) \
    VALUES \
    `;

    let values = [res.locals.decoded.userid];
    for (let i = 0; i < req.body.length; ++i) {
        if (i != 0) qstring += ', ';

        qstring += `($1, \$${i+2})`;
        values.push(req.body[i]);
    }

    await pgPool.query(qstring, values);

    res.status(200).json();
});

export const deleteUserInterests = asyncHandler(async (req, res) => {
    let qstring = `\
    DELETE FROM "UserInterest" \
    WHERE userId = $1 and interestId = $2 \
    `;

    await executeArrayQuery(
        qstring,
        (req, _res) => req.body,
        (_req, res, interestId) => [res.locals.decoded.userid, interestId],
        req,
        res
    );

    res.status(200).json();
});


export const addUserQuestionAnswers = asyncHandler(async (req, res) => {
    let qstring = `\
    INSERT INTO "MakeOrBreakUserAnswer" \
    (userId, mobqid, mobqpaid) \
    VALUES \
    ($1, $2, $3) \
    `;

    await executeArrayQuery(
        qstring,
        (req, _res) => req.body, 
        (_req, res, answer) => [
            res.locals.decoded.userid, 
            answer.mobqid,
            answer.mobqpaid
        ],
        req,
        res
    );

    res.status(200).json();
});

export const deleteUserQuestionAnswers = asyncHandler(async (req, res) => {
    let qstring = `\
    DELETE FROM "MakeOrBreakUserAnswer" \
    WHERE userId = $1 and mobqid = $2 and mobqpaid = $3 \
    `;

    await executeArrayQuery(
        qstring,
        (req, _res) => req.body, 
        (_req, res, answer) => [
            res.locals.decoded.userid, 
            answer.mobqid,
            answer.mobqpaid
        ],
        req,
        res
    );

    res.status(200).json();
});


// photos stuff

export const addPhotos = asyncHandler(async (req, res) => {
    const qstring = '\
    INSERT INTO "Photo" \
    (id, userid, path) \
    values \
    ($1, $2, $3) \
    ';

    const userId = res.locals.decoded.userid;

    const getFileData = x => x;
    const uploadPhoto = (fileData) => {
        let  uuid = uuidv4();
        let  photoPath = path.join("photos", uuid);

        fs.writeFileSync(photoPath, fileData);

        return [uuid, userId, photoPath];
    }
    
    await executeArrayQuery(
        qstring,
        (req, _res) => req.body.map(getFileData),
        (_req, _res, fileData) => uploadPhoto(fileData),
        req,
        res
    );

    res.status(200).json();
});


// contact info

export const getUserContactInfo = asyncHandler(async (req, res) => {
    const myId = res.locals.decoded.userid;
    const otId = req.params.userid;

    let qstring = '\
    SELECT id from "Match" \
    WHERE (userid1 = $1 and userid2 = $2) or \
          (userid2 = $1 and userid1 = $2) \
    ';
    let result = await pgPool.query(qstring, [myId, otId]);
    if (result.rowCount == 0)
        throw createError(StatusCodes.FORBIDDEN, "No successful match with the given user");

    qstring = '\
    SELECT contactInfo FROM "User" \
    WHERE id = $1 \
    ';
    result = await pgPool.query(qstring, [otId]);

    res.status(200).json(result.rows[0]);
});
