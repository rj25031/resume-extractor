import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import resumeRoute from "./Routes/userResume.js";

app.use("/api/user", resumeRoute);
const PORT = process.env.PORT || 8080;
app.listen(PORT , ()=>{
    console.log("app started at port ", PORT);
})