// require("dotenv").config({path: "./env"});
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { PORT } from "../config.js";
import app from "./app.js";

dotenv.config({
    path: "./env"
})

try {
    await connectDB();
    app.on("error", () => {
        console.error(`ERROR in connecting to DB}`);
        process.exit(1);
    })
    app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
} catch (error) {
    console.log("DB CONNECTION FAILED", error);
}













/*
import express from "express";
const app = express();
; (async () => {
    try {
        const res = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
        app.on("error", () => {
            console.error("ERROR application not able to talk to db");
            throw (error);
        });
        app.listen(PORT, () => console.log(`Application is litening on port ${PORT}`));
    } catch (error) {
        console.error("ERROR in connecting to mongoDB", error)
    }
})();
*/