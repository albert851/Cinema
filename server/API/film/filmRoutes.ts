import express from "express";
import {
    createFilm,
    deleteFilmById,
    getAllFilms,
    getFilmById,
    updateFilm
} from "./filmCtrl";

const router = express.Router();
    
router
    .get("/allFilms", getAllFilms)
    .get("/oneFilm/:id", getFilmById)
    .post("/newFilm", createFilm)
    .patch("/update/:id", updateFilm)
    .delete("/:id", deleteFilmById)

export default router;