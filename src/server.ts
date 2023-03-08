import express, { Request, Response, NextFunction } from 'express';
const dotenv = require('dotenv');
import cors from 'cors';
dotenv.config();
const connectDB = require('./config/db');
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
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (false) {
        console.log(req, res, next);
    }
    console.log(error);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
