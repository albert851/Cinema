import express from "express";
import {
  register,
} from "./adminCtrl";

const router = express.Router();

router
  .post("/register", register)

export default router;
