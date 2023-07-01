import express from "express";
import AdminModel, { AdminValidation } from "./adminModel";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import { error } from "console";
const saltRounds = 10;

export async function login(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("Couldn't get all fields from req.body");

    const adminDB = await AdminModel.findOne({ email });
    if (!adminDB) throw new Error("Admin with that email can't be found");
    if (!adminDB.password) throw new Error("No password in DB");

    const isMatch = await bcrypt.compare(password, adminDB.password);
    if (!isMatch) throw new Error("Email or password do not match");

    //sending cookie
    const cookie = { adminId: adminDB._id };
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const JWTCookie = jwt.encode(cookie, secret);

    res.cookie("userID", JWTCookie);
    res.send({ login: true, adminDB });
  } catch (error) {
    res.send({ error: error.message });
  }
}