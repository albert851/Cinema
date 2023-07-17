import mongoose, { Schema } from "mongoose";
import FilmModel from "../film/filmModel";

const ScreeningSchema = new mongoose.Schema({
  filmId: String,
//   filmId: { type: Schema.Types.ObjectId, ref: FilmModel },
  dayId: String,
  day: String,
  time: String,
  seats: [Boolean],
});

const ScreeningModel = mongoose.model("screening", ScreeningSchema);

export default ScreeningModel;
