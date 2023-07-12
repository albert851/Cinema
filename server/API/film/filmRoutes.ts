import express from "express";
import {
    createFilm,
    deleteFilmById,
    getAllFilms,
    updateFilm
} from "./filmCtrl";

const router = express.Router();
    
router
    .get("/allFilms", getAllFilms)
    .post("/newFilm", createFilm)
    .patch("/update/:id", updateFilm)
    .delete("/:id", deleteFilmById)


export default router;