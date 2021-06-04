import express from 'express';
import { withJWTAuthMiddleware } from 'express-kun';
import { createLogin, login } from '../controllers/login.js';
import { getQuestions, getQuestionAnswers, getInterests, getGenders } from '../controllers/misc.js';
import { 
    getUserProfile, 
    getRandomUserProfile, 
    updateUser, 
    addUserInterests, 
    deleteUserInterests,
    addUserQuestionAnswers,
    deleteUserQuestionAnswers,
    getUserContactInfo,
    addPhotos
} from '../controllers/user.js';
import {
    getLikes,
    addLike,
    getMatches,
    getMatch
} from '../controllers/match.js';
import { jwtKey } from '../secret.js';

const router = express.Router();
const protectedRouter = withJWTAuthMiddleware(router, jwtKey);

// login

router.post('/createLogin', createLogin);
router.post('/login', login);

// misc

router.get('/questions', getQuestions);
router.get('/questions/:questionId/answers', getQuestionAnswers);
router.get('/interests', getInterests);
router.get('/genders', getGenders);

// user

router.get('/profile/random', getRandomUserProfile);
router.get('/profile/:username', getUserProfile);

protectedRouter.put('/user', updateUser);

protectedRouter.put('/user/interests', addUserInterests);
protectedRouter.delete('/user/interests', deleteUserInterests);

protectedRouter.put('/user/answers', addUserQuestionAnswers);
protectedRouter.delete('/user/answers', deleteUserQuestionAnswers);
protectedRouter.get('/users/:userid/contact-info', getUserContactInfo);

protectedRouter.put('/user/photos', addPhotos);

// likes & matches

protectedRouter.get('/likes', getLikes);
protectedRouter.post('/likes', addLike);
protectedRouter.get('/matches', getMatches);
protectedRouter.get('/matches/:matchid', getMatch);


export default router;
