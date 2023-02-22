const express = require('express');
const dotenv = require('dotenv');
import { Request, Response } from 'express';
dotenv.config();

const app = express();
const port = process.env.PORT || '5000';

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express + TypeScript Server (Hamy)');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
