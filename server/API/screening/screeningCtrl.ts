import express from "express";
import ScreeningModel from "./screeeningModel";

export async function createScreening(
  req: express.Request,
  res: express.Response
) {
  try {
    const { filmId, dayId, day, time, seats } = req.body;

    if (!filmId || !dayId || !day || !time || !seats)
      throw new Error("Couldn't get screening data from req.body");

    const screeningDB = new ScreeningModel({ filmId, dayId, day, time, seats });
    await screeningDB.save();

    if (screeningDB) {
      res.send({ screening_create: true, screeningDB });
    } else {
      res.send({ screening_create: false });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
}

export async function getAllScreenings(req, res) {
  try {
    const screeningDB = await ScreeningModel.find();
    // const screeningDB = await ScreeningModel.find().populate("filmId");
    // const screeningDB = await ScreeningModel.find({"filmId": filmId});
    res.send({ screeningDB });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

//router.delete("/api/screenings/film/:filmId")

export async function deleteAllScreeningsByFilmId(filmId) {
  try {
    // const { filmId } = req.params;
    if (!filmId)
      throw new Error(
        "no film Id on deleteAllScreeningsByFilmId, at screeningCtrl"
      );

    const deleteScreeiningDB = await ScreeningModel.deleteMany({ filmId });
    console.log(deleteScreeiningDB);
    if (deleteScreeiningDB.deletedCount != 0) {
      // res.send({ deleteScreeiningDB, ok: true });
      return true
    } else {
      throw new Error("no screeing was deleted");
    }
  } catch (error) {
    console.log(error);
    // res.status(500).send({ error: error.message });
    return false
  }
}
