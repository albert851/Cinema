import mongoose from "mongoose";

const FilmSchema = new mongoose.Schema({
    title: String,
    genree: String,
    cast: String,
    director: String,
    age: String,
    pic: String,
    screeningTimes: [{
        day: String,
        times: [String]
    }],
    summary: String
});

const FilmModel = mongoose.model("film", FilmSchema);

export default FilmModel;