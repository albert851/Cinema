import express from "express";
import {
    createScreening,
    deleteAllScreeningsByFilmId,
    getAllScreenings
} from "./screeningCtrl";

const router = express.Router();
    
router //.post("", createScreening)
    .post("/newScreening", createScreening)
    //.get("", get-all-screenings)
    //.patch("/:screeingid)
    .get("/allScreenings", getAllScreenings)
    //.get("/:screeingid", getScreeningBYId)
    .delete("/film/:filmId", deleteAllScreeningsByFilmId)

export default router;