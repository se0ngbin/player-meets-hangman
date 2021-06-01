import express from 'express';
import { withJWTAuthMiddleware } from 'express-kun';
import { createLogin, login } from '../controllers/login.js';
import { getQuestions, getQuestionAnswers, getInterests, getGenders } from '../controllers/misc.js';
import { getUserProfile, getRandomUserProfile } from '../controllers/user.js';
import { jwtKey } from '../secret.js';

const router = express.Router();
const protectetRouter = withJWTAuthMiddleware(router, jwtKey);

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

// to be deleted

protectetRouter.get('/protected', async (_req, res) => {
    res.status(200).json(`congrats, you are logged in: ${res.locals.decoded.username}`);
});

export default router;
