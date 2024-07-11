import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_ORIGIN } from "../config";

const app = express();

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
}));

// data comming from form
app.use(express.json({
    limit: "16kb",
}));

// data coming from url
app.use(express.urlencoded({
    limit: "16kb",
    extended: true, // data inside data, most of the cases it's not in use
}));

// for temperory file storage in backend
app.use(express.static("public"));

// for reading user's browser cookie
app.use(cookieParser());

export default app;