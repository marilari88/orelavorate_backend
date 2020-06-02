import { HandlerFunc, Context } from "https://deno.land/x/abc/mod.ts";

import db from "../config/db.ts";

import { ErrorHandler } from "../utils/middlewares.ts";

const database = db.getDatabase;
const timbratureCollection = database.collection("timbrature");

interface Timbratura {
  _id: {
    $oid: string;
  };
  ingresso: String;
  uscita?: String;
  differenza?: Number;
}

export const inserisciTimbratura: HandlerFunc = async (c: Context) => {
  try {
    if (c.request.headers.get("content-type") !== "application/json") {
      throw new ErrorHandler("Invalid body", 422);
    }
    //console.log(`Inserimento ${Object.keys(c.request.body)}`);
    const body: Timbratura = await (c.body());

    if (!Object.keys(body).length) {
      throw new ErrorHandler("Request body can not be empty!", 400);
    }
    const { ingresso, uscita, differenza } = body;

    const timbraturaInserita = await timbratureCollection.insertOne({
      ingresso,
      uscita,
      differenza,
    });

    return c.json(timbraturaInserita, 201);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};

export const getTimbrature: HandlerFunc = async (c) => {
  try {
    const elencoTimbrature:Timbratura[]= await timbratureCollection.find({});
    return elencoTimbrature;
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
