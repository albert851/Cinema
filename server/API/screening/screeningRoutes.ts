import express from "express";
import {
    createScreening,
    deleteAllScreeningsByFilmId,
    getAllScreenings,
    getScreeningById,
    getScreeningByDay,
    updateScreaning
} from "./screeningCtrl";

const router = express.Router();
    
router
    .post("/newScreening", createScreening)
    .get("/allScreenings", getAllScreenings)
    .get("/:day", getScreeningByDay)
    .get("/time/:id", getScreeningById)
    .patch("/:id", updateScreaning)
    .delete("/film/:filmId", deleteAllScreeningsByFilmId)

export default router;