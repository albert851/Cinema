import mongoose, { Schema } from "mongoose";
import ScreeningModel from "../screening/screeeningModel";

const SeatsSchema = new mongoose.Schema({
  screeningId: { type: Schema.Types.ObjectId, ref: ScreeningModel },
  filmId: String,
  index: Number,
  email: String
});

const SeatsModel = mongoose.model("seats", SeatsSchema);

export default SeatsModel;