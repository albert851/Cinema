import express from "express";
import RoomModel from "./filmModel";

export async function createFilm(req: express.Request, res: express.Response) {
  try {
    const { title, genree, cast, director, age, pic, screeningTimes, summary } = req.body;

    if (!title || !genree || !cast || !director || !age || !pic || !screeningTimes || !summary)
      throw new Error("Couldn't get film data from req.body");

      console.log(title);

    const filmDB = new RoomModel({ title, genree, cast, director, pic, screeningTimes, summary });
    await filmDB.save();

    if (filmDB) {
      res.send({ film_create: true, filmDB });
    } else {
      res.send({ film_create: false });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
}
