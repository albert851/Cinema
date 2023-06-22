import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.static("public"));
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
app.use(express.static("public"));


app.use(cookieParser());


app.listen(PORT, () => {
    console.log(`server is running on porrt: ${PORT}`)
})