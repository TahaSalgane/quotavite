import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import connectDBandStartServer from './config/db';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import quoteRoutes from './routes/quote';
import tags from './routes/tags';
import users from './routes/users';
import { ResponseError } from './utils/type';
// Set Headers using CORS instead of codding all headers manually
const corsOptionsDelegate = (req: Request, callback: any) => {
    let corsOptions = {};
    corsOptions = {
        ...corsOptions,
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization', 'Accept'],
    };
    callback(null, corsOptions); // callback expects two parameters: error and options
};
const app = express();

app.use(cors(corsOptionsDelegate));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/tags', tags);
app.use('/api/users', users);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Middleware Error Hadnling');
    const errStatus = (err as ResponseError).statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        message: errMsg,
    });
});

connectDBandStartServer(app);
