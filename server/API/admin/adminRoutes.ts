import express from "express";
import {
  login,
} from "./adminCtrl";

const router = express.Router();

router
  .post("/login", login)

export default router;
