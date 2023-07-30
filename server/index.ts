import express from 'express';
import dotenv from 'dotenv';

import connectDB from './mongoDB/connectDB.ts';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
