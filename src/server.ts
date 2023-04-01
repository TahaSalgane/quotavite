import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDBandStartServer from './config/db';
import ErrorHanlder from './middleware/ErrorHandler';
import authRoutes from './routes/auth';
import quoteRoutes from './routes/quote';
import tagsRoute from './routes/tags';
import usersRoute from './routes/users';
import commentRoutes from './routes/comments';
import passwordRoutes from './routes/password';
import corsOptionsDelegate from './middleware/Cors';
import xss from 'xss-clean';
import ForkProcess from './utils/fork_process';

const app = express();
app.use(xss());

ForkProcess();

app.use(cors(corsOptionsDelegate));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/tags', tagsRoute);
app.use('/api/users', usersRoute);
app.use('/api/comment', commentRoutes);
app.use('/api/password', passwordRoutes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(ErrorHanlder);
connectDBandStartServer(app);
