import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import connectDB from './mongoDB/connectDB.ts';
import userRoutes from './routes/userRoutes.ts';

connectDB();

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
