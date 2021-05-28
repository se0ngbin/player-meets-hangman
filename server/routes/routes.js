import express from 'express';
import { withJWTAuthMiddleware } from 'express-kun';
import { createLogin, login } from '../controllers/login.js';
import { jwtKey } from '../secret.js';

const router = express.Router();
const protectetRouter = withJWTAuthMiddleware(router, jwtKey);


router.post('/createLogin', createLogin);
router.post('/login', login);

protectetRouter.get('/protected', async (req, res) => {
    res.status(200).json(`congrats, you are logged in: ${res.locals.decoded.username}`);
});

export default router;
