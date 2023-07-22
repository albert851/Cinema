import express from "express";
import {
    createScreening,
    deleteAllScreeningsByFilmId,
    getAllScreenings,
    getScreeningById,
    getScreeningByDay,
    getScreeningByFilmId,
    updateScreaning
} from "./screeningCtrl";

const router = express.Router();
    
router
    .post("/newScreening", createScreening)
    .get("/allScreenings", getAllScreenings)
    .get("/:day", getScreeningByDay)
    .get("/time/:id", getScreeningById)
    .get("/films/:id", getScreeningByFilmId)
    .patch("/:id", updateScreaning)
    .delete("/film/:filmId", deleteAllScreeningsByFilmId)

export default router;