import dns from 'dns';
dns.setServers(['1.1.1.1', '8.8.8.8']);

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { errors } from 'celebrate';
import 'dotenv/config';

import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';

import authRouter from './routes/authRoutes.js';
import storiesRouter from './routes/storiesRoutes.js';
import usersRouter from './routes/usersRoutes.js';
import categoriesRouter from './routes/categoriesRoutes.js';

const app = express();

app.use(logger);

app.use(express.json({ limit: '5mb' }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/stories', storiesRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

const port = Number(process.env.PORT) || 4200;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
