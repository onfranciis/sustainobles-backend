import { Schema, model } from "mongoose";
import { ITicket } from "../types/Model.types";

const TicketSchema = new Schema<ITicket>({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  item: { type: String, required: true },
  date: {
    type: Date,
    default: () => {
      const date = new Date();
      return date;
    },
  },
});

const Ticket = model("Ticket", TicketSchema);

export default Ticket;
