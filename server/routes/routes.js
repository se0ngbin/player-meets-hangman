import express from 'express';
import { createLogin } from '../controllers/login.js'

const router = express.Router();


router.post('/createLogin', createLogin);

export default router;
