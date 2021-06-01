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
    deleteUserQuestionAnswers
} from '../controllers/user.js';
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



// to be deleted

protectedRouter.get('/protected', async (_req, res) => {
    res.status(200).json(`congrats, you are logged in: ${res.locals.decoded.username}`);
});

export default router;
