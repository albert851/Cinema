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
    const screeningDB = await ScreeningModel.find().populate("filmId");
    res.send({ screeningDB });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function getScreeningByDay(req, res) {
  try {
    const {day} = req.params
    const screeningsDB = await ScreeningModel.find({day}).populate("filmId");
    res.send({ screeningsDB });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function getScreeningById(req, res) {
  try {
    const sreeningsDB = await ScreeningModel.findById(req.params.id).populate("filmId");
    res.send({ sreeningsDB });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function getScreeningByFilmId(req, res) {
  try {
    const filmId = req.params.id

    console.log({ filmId })
    const sreeningsDB = await ScreeningModel.find({ filmId }).populate("filmId");;
    res.send({ sreeningsDB });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function deleteAllScreeningsByFilmId(filmId) {
  try {
    if (!filmId)
      throw new Error(
        "no film Id on deleteAllScreeningsByFilmId, at screeningCtrl"
      );

    const deleteScreeiningDB = await ScreeningModel.deleteMany({ filmId });
    console.log(deleteScreeiningDB);
    if (deleteScreeiningDB.deletedCount != 0) {
      return true
    } else {
      throw new Error("no screeing was deleted");
    }
  } catch (error) {
    console.log(error);
    return false
  }
}

export async function updateScreaning(req, res) {
  try {
    const { seats } = req.body;
    const screeningsDB = await ScreeningModel.findByIdAndUpdate(
      req.params.id,
      { seats },
    );
    res.send({ updated: true, screeningsDB });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
