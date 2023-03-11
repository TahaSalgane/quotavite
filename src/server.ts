import express, { Request, Response } from 'express';
// import { ResponseError } from './utils/type';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import connectDB from './config/db';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import quoteRoutes from './routes/quote';
import tags from './routes/tags';
import users from './routes/users';
connectDB();
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
const port = process.env.PORT || '5000';
app.use(cors(corsOptionsDelegate));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/tags', tags);
app.use('/api/users', users);

app.use((err: Error, req: Request, res: Response) => {
    console.log('Middleware Error Hadnling');
    // const errStatus = (err as ResponseError).statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(500).json({
        success: false,
        message: errMsg,
    });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
