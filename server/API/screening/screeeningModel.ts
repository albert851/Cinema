import mongoose from "mongoose";

const ScreeningSchema = new mongoose.Schema({
    filmId: String,
    dayId: String,
    day: String,
    time: String,
    seats: [Boolean],
});

const ScreeningModel = mongoose.model("screening", ScreeningSchema);

export default ScreeningModel;