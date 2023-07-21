import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

mongoose.set('strictQuery', true);

const mongo_url = process.env.MONGO_URI;

mongoose.connect(mongo_url).then(res => {
    console.log("Connected to DB")
}).catch((err) => {
    console.log("at mongoose.connect: ")
    console.log(err.message);
});

app.use(express.json());
app.use(cookieParser());

import adminRoutes from "./API/admin/adminRoutes";
app.use("/api/admin", adminRoutes);

import filmRoutes from "./API/film/filmRoutes";
app.use("/api/film", filmRoutes);

import screeningRoutes from "./API/screening/screeningRoutes";
app.use("/api/screening", screeningRoutes);

import seatsRoutes from "./API/seats/seatsRoutes";
app.use("/api/seats", seatsRoutes);


app.listen(PORT, () => {
    console.log(`server is running on porrt: ${PORT}`)
})