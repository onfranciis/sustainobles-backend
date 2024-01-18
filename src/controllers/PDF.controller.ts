import { RequestHandler } from "express";
import Ticket from "../model/Ticket.model";

const PDF: RequestHandler = async (req, res) => {
  try {
    const results = await Ticket.find();

    res.render("Sheet", { results });
  } catch (err) {
    console.log(err);
    res.status(500).send({ result: null, error: `Something went wrong` });
  }
};

export default PDF;
