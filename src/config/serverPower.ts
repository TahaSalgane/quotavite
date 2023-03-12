import { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || '5000';

const serverPower = (app: Express) =>
    app.listen(port, () => {
        console.log(`[server]: Server is running at port ${port}`);
    });

export default serverPower;
