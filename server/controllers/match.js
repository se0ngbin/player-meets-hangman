import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import pg from 'pg';

import { StatusCodes } from 'http-status-codes';
import { connectionString } from '../constants.js';
import { requireProperties } from '../utils.js';

const pgPool = new pg.Pool({ connectionString });

export const getLikes = asyncHandler(async (req, res) => {
    const qstring = '\
    SELECT likeeid as userid, username  FROM "Like" as l \
    INNER JOIN "LoginInfo" as li on li.id = l.likeeid \
    WHERE likerid = $1 \
    ';

    const result = await pgPool.query(qstring, [res.locals.decoded.userid]);

    res.status(200).json(result.rows);
});

export const addLike = asyncHandler(async (req, res) => {
    requireProperties(req.body, ['userid']);

    let qstring = '\
    INSERT INTO "Like" \
    (likerid, likeeid) \
    VALUES \
    ($1, $2) \
    ';

    const likerId = res.locals.decoded.userid;
    const likeeId = req.body.userid;

    await pgPool.query(qstring, [likerId, likeeId]);

    let resultToSend = { status: "liked" }
    // now we have to check if we somehow have a like from the other side
    // ... helooo from the other siiiiiiiiiiiiiiiiiide ...

    qstring = '\
    SELECT FROM "Like" \
    WHERE likerid = $1 and likeeid = $2 \
    ';

    let result = await pgPool.query(qstring, [likeeId, likerId]);
    if (result.rowCount == 1) {
        resultToSend.status = "matched";

        qstring = '\
        INSERT INTO "Match" \
        (userid1, userid2) \
        VALUES \
        ($1, $2) \
        RETURNING id as matchid \
        ';

        result = await pgPool.query(qstring, [likerId, likeeId]);
        resultToSend.matchid = result.rows[0].matchid;
    }

    res.status(200).json(resultToSend);
});

export const getMatches = asyncHandler(async (req, res) => {
    const myId = res.locals.decoded.userid;

    const qstring = '\
    SELECT m.id as id, l.id as userid, username \
    FROM "Match" as m \
    INNER JOIN "LoginInfo" as l on m.userid2 = l.id \
    WHERE m.userid1 = $1 \
    UNION \
    SELECT m.id as id, l.id as userid, username \
    FROM "Match" as m \
    INNER JOIN "LoginInfo" as l on m.userid1 = l.id \
    WHERE m.userid2 = $1 \
    ';

    const result = await pgPool.query(qstring, [myId]);

    res.status(200).json(result.rows);
});

export const getMatch = asyncHandler(async (req, res) => {
    const myId = res.locals.decoded.userid;
    const matchId = req.params.matchid;

    const qstring = '\
    SELECT m.id as id, l.id as userid, username \
    FROM "Match" as m \
    INNER JOIN "LoginInfo" as l on m.userid2 = l.id \
    WHERE m.id = $1 and m.userid1 = $2 \
    UNION \
    SELECT m.id as id, l.id as userid, username \
    FROM "Match" as m \
    INNER JOIN "LoginInfo" as l on m.userid1 = l.id \
    WHERE m.id = $1 and m.userid2 = $1 \
    ';

    const result = await pgPool.query(qstring, [matchId, myId]);
    if (result.rowCount == 0)
        throw createError(StatusCodes.NOT_FOUND, `Match with id ${matchId} could not be found through your matches`);

    res.status(200).json(result.rows[0]);
});
