import { Request } from 'express';

// Set Headers using CORS instead of codding all headers manually
const corsOptionsDelegate = (req: Request, callback: any) => {
    let corsOptions = {};
    corsOptions = {
        ...corsOptions,
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization', 'Accept'],
    };
    callback(null, corsOptions); // callback expects two parameters: error and options
};
export default corsOptionsDelegate;
