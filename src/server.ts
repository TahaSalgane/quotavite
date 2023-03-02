const dotenv = require('dotenv');
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
connectDB();
const app = express();
const port = process.env.PORT || '5000';
app.use(bodyParser.urlencoded({ extendd: false }));
app.use(bodyParser.json());
const routes = require('./routes/auth');
app.use('/api/auth', routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (false) {
        console.log(req, res, next);
    }
    console.log(error);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
