import express from "express";
import {
    createFilm
} from "./filmCtrl";

const router = express.Router();
    
router
    .post("/newFilm", createFilm)


export default router;