const mongoose = require('mongoose');
const connectDB = () => {
    try{
        require('dotenv').config();
        mongoose.connect(process.env.MnConnection);
        console.log("Success: Connected to MongoDB");
    } catch(e) {
        console.log("Failure: Unconnected to MongoDB");
        throw new Error();
    };
};

module.exports = connectDB;