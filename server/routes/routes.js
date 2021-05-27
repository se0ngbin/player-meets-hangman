import express from 'express';
import { createLogin, login } from '../controllers/login.js'

const router = express.Router();


router.post('/createLogin', createLogin);
router.post('/login', login);

export default router;
