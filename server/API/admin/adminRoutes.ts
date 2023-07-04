import express from "express";
import {
  getByCookie,
  logout,
  login,
} from "./adminCtrl";

const router = express.Router();

router
  .get("/get-from-cookie", getByCookie)
  .get("/logout", logout)
  .post("/login", login)


export default router;
