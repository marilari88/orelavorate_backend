import db from "../config/db.ts";
import { Timbratura } from "../interfaces/timbratura.ts";
const database = db.getDatabase;
const timbratureCollection = database.collection("timbrature");

export const getTimbratura = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  try {
    const timbratura: Timbratura = await timbratureCollection.findOne(
      { _id: { $oid: params.id } },
    );

    if (!timbratura) {
      throw new Error("Timbratura non trovata");
    }

    const { _id, ingresso, uscita, differenza } = timbratura;
    response.status = 200;
    response.body = { _id, ingresso, uscita, differenza };
  } catch (error) {
    response.message = error.message;
    response.status = 400;
    console.log(error.message);
  }
};

export const getTimbrature = async ({ response }: { response: any }) => {
  try {
    const elencoTimbrature: Timbratura[] = await timbratureCollection.find();
    if (elencoTimbrature) {
      const elencoTimbratureElaborate = elencoTimbrature.length
        ? elencoTimbrature.map((timbratura) => {
          const { _id: { $oid }, ingresso, uscita, differenza } = timbratura;
          return { id: $oid, ingresso, uscita, differenza };
        })
        : [];
      response.body = { elenco: elencoTimbratureElaborate };
      response.status = 200;
      // return c.json(elencoTimbratureElaborate, 200);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createTimbratura = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  try {
    if (request.headers.get("content-type") !== "application/json") {
      throw new Error("Invalid body");
    }

    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "Nessun dato fornito",
      };
      throw new Error("Attenzione nessun dato fornito");
    }
    const body: any = await request.body();

    const { ingresso, uscita, differenza } = body.value;

    const timbraturaInserita = await timbratureCollection.insertOne({
      ingresso,
      uscita,
      differenza,
    });

    response.body = { success: true, id: timbraturaInserita };
    response.status = 201;
  } catch (error) {
    console.log(error.message);
    response.status = 400;
    response.message = error.message;
  }
};

export const updateTimbratura = async ({
  request,
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    if (request.headers.get("content-type") !== "application/json") {
      throw new Error("Invalid body");
    }

    if (!request.hasBody) {
      throw new Error("Attenzione nessun dato fornito");
    }
    const body = await request.body();
    const { ingresso, uscita, differenza } = body.value;

    const idTimbratura = params.id;
    const { matchedCount, modifiedCount } = await timbratureCollection
      .updateOne(
        { _id: { $oid: idTimbratura } },
        { $set: { ingresso, uscita, differenza } },
      );

    if (!matchedCount) {
      throw new Error(`Timbratura non trovata con id ${params.id}`);
    }

    response.body = { rowModified: modifiedCount };
    response.success = true;
    response.status = 200;
  } catch (Error) {
    console.log(Error.message);
    response.status = 400;
    response.message = Error.message;
  }
};

export const deleteTimbratura = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  try {
    const idTimbratura = params.id;

    const timbraturaTrovata = await timbratureCollection.findOne(
      { _id: { $oid: idTimbratura } },
    );
    if (!timbraturaTrovata) {
      response.status = 404;
      response.message = "Timbratura Non trovata";
    } else {
      const result = await timbratureCollection.deleteOne(
        { _id: { $oid: idTimbratura } },
      );
    }
    response.status = 200;
    response.message = "Timbratura Cancellata";
    response.success = true;
  } catch (Error) {
    console.log(Error.message);
    response.status = 400;
    response.message = Error.message;
  }
};
