import express from "express";
import SeatsModel from "./seatsModel";

export async function createSeats(
  req: express.Request,
  res: express.Response
) {
  try {
    const { screeningId, filmId, index, email } = req.body;

    if (!screeningId || !filmId || !index || !email)
      throw new Error("Couldn't get seats data from req.body");

    const seatsDB = new SeatsModel({ screeningId, filmId, index, email });
    await seatsDB.save();

    if (seatsDB) {
      res.send({ seats_create: true, seatsDB });
    } else {
      res.send({ sseats_create: false });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
}
