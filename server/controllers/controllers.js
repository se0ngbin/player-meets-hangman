import express from 'express';
import mongoose from 'mongoose';


const router = express.Router();

export const saySomething = async (req, res) => {
    res.status(200).json({
        body: 'Hello from the server!'
    });
};

export default router;