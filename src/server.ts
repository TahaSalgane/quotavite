import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDBandStartServer from './config/db';
import ErrorHanlder from './middleware/ErrorHandler';
import authRoutes from './routes/auth';
import quoteRoutes from './routes/quote';
import tagsRoute from './routes/tags';
import usersRoute from './routes/users';
import corsOptionsDelegate from './middleware/Cors';

import ForkProcess from './utils/fork_process';

const app = express();

ForkProcess();

app.use(cors(corsOptionsDelegate));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/tags', tagsRoute);
app.use('/api/users', usersRoute);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(ErrorHanlder);
connectDBandStartServer(app);
