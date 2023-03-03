const mongoose = require('mongoose');
const connectDB = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('mongo connected');
};
module.exports = connectDB;
