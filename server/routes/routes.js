import express from 'express';
const router = express.Router();
import {saySomething} from '../controllers/controllers.js'

router.get('/say-something', saySomething);

export default router;