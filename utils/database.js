const mongoose = require("mongoose");
const connectDB = async() => {
    try{
        require("dotenv").config();
        await mongoose.connect(process.env.MnC);
        console.log("Success: Connected to MongoDB");
    } catch(e) {
        console.log("Failure: Unconnected to MongoDB");
        throw new Error();
    };
};

module.exports = connectDB;