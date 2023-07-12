import express from "express";
import FilmModel from "./filmModel";
import { deleteAllScreeningsByFilmId } from "../screening/screeningCtrl";

export async function createFilm(req: express.Request, res: express.Response) {
  try {
    const { title, genree, cast, director, age, pic, screeningTimes, summary } = req.body;

    if (!title || !genree || !cast || !director || !age || !pic || !screeningTimes || !summary)
      throw new Error("Couldn't get film data from req.body");

    const filmDB = new FilmModel({ title, genree, cast, director, age, pic, screeningTimes, summary });
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

export async function getAllFilms(req, res) {
  try {
    const filmsDB = await FilmModel.find();
    res.send({ filmsDB });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function updateFilm(req, res) {
  try {
    console.log("hi")
    
    const { title, genree, cast, age, pic, screeningTimes, summary } = req.body;
    const filmDB = await FilmModel.findByIdAndUpdate(
      req.params.id,
      { title, genree, cast, age, pic, screeningTimes, summary },
    );
    res.send({ updated: true, filmDB });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function deleteFilmById(req: express.Request, res: express.Response) {
  try {
    const deletedScreeing = await deleteAllScreeningsByFilmId(req.params.id)
    if (deletedScreeing) {
      const filmsDB = await FilmModel.findByIdAndDelete(req.params.id);
      res.send({ filmsDB });
    } else {
      throw new Error("No screenings were deleted")
    }

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
