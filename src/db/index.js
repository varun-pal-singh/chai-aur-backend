import mongoose from "mongoose";
import { MONGODB_URI } from "../../config.js";
import { DB_NAME } from "../constants.js";

async function connectDB(){
    try {
        const connectionInstance =  await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
        // console.log("Connection Instance", connectionInstance)
        console.log(`\n MongoDB connected:: DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`ERROR: connection FAILED ${error}`);
        process.exit(1);
    }
}

export default connectDB;