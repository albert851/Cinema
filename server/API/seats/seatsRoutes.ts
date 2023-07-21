import express from "express";
import {
    createSeats,
} from "./seatsCtrl";

const router = express.Router();
    
router
    .post("/newSeat", createSeats)

export default router;