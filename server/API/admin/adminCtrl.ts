import express from "express";
import AdminModel, { AdminValidation } from "./adminModel";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import { error } from "console";
const saltRounds = 10;

export async function register(req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;

      console.log(email, password)

      if (!email || !password)
        throw new Error("Couldn't get all fields from req.body");
  
      const { error } = AdminValidation.validate({
        email,
        password,
      });
      if (error) throw error;
  
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
  
      const adminDB = new AdminModel({ email, password: hash });
      await adminDB.save();
  
      //sending cookie
      const cookie = { userId: adminDB._id };
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("Couldn't load secret from .env");
  
      const JWTCookie = jwt.encode(cookie, secret);
  
      if (adminDB) {
        res.cookie("userID", JWTCookie);
        res.send({ register: true, adminDB });
      } else {
        res.send({ register: false });
      }
    } catch (error) {
      res.send({ error: error.message });
    }
  }