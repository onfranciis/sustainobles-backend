import { RequestHandler } from "express";
import Ticket from "../model/Ticket.model";

const GetTicket: RequestHandler = async (req, res) => {
  try {
    const result = await Ticket.find().select({ __v: 0 });

    res.send({ error: null, result });
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: null, error: "Something went wrong" });
  }
};

export default GetTicket;
