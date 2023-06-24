import exress from "express";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import { error } from "console";
const saltRounds = 10;

export async function register(req: express.Request, res: express.Response) {
    try {
      const { email, name, password, repeatPassword } = req.body;
      if (!email || !name || !password || !repeatPassword)
        throw new Error("Couldn't get all fields from req.body");
  
      const { error } = UserValidation.validate({
        email,
        name,
        password,
        repeatPassword,
      });
      if (error) throw error;
  
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
  
      const query = `INSERT INTO users (email, password, name) VALUES ('${email}', '${hash}', '${name}')`;
      connection.query(query, (error, results, fields) => {
        try {
          //sending cookie
          if (error) throw error;
          const secret = process.env.JWT_SECRET;
          if (!secret) throw new Error("Couldn't load secret from .env");
          //@ts-ignore
          const cookie = { user_Id: results.insertId };
          const JWTCookie = jwt.encode(cookie, secret);
  
          res.cookie("userID", JWTCookie);
          res.send({ register: true, results });
        } catch (error) {
          console.log(error);
          res.status(500).send({ ok: false, error: error });
        }
      });
    } catch (error) {
      res.status(500).send({ notOK: error });
    }
  }