import { Express } from 'express';
import mongoose from 'mongoose';
import serverPower from './serverPower';
const databaseUrl = process.env.MONGO_URI ?? '';

const connectDBandStartServer = (app: Express) =>
    mongoose
        .connect(databaseUrl)
        .then(() => {
            console.log('mongo connected');
            // Start Node Server
            serverPower(app);
        })
        .catch((err) => console.log(err));

export default connectDBandStartServer;
