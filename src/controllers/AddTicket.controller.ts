import { RequestHandler } from "express";
import Ticket from "../model/Ticket.model";
import { TicketValidator } from "../utils/TicketValidator";
import { ITicket } from "../types/Model.types";

const AddTicket: RequestHandler = async (req, res) => {
  const form = req.body as ITicket;

  await TicketValidator(form)
    .then(async () => {
      const { name: Oname, phoneNumber: OphoneNumber, item: Oitem } = form;

      try {
        const addedTicket = await Ticket.create({
          name: Oname,
          phoneNumber: OphoneNumber,
          date: Date.now(),
          item: Oitem,
        });

        const { name, phoneNumber, item, date } = addedTicket;

        res
          .status(201)
          .send({ error: null, result: { name, phoneNumber, item, date } });
      } catch (err) {
        console.log(err);
        res.status(500).send({ error: `Something went wrong`, result: null });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ ...err });
    });
};

export default AddTicket;
