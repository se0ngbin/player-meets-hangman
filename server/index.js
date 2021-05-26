import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import api from './routes/routes.js';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cors());

// Configure app to use route
app.use('/api/v1/', api);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});