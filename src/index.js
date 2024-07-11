// require("dotenv").config({path: "./env"});
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env"
})

connectDB();













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