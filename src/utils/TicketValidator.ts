import { ITicket } from "../types/Model.types";

export const TicketValidator = (form: ITicket) => {
  const { name, item, phoneNumber } = form;

  return new Promise((resolve, reject) => {
    if (!form) {
      reject({ result: null, error: `Empty form` });
    }

    if (Object.keys(form).length > 3) {
      reject({ result: null, error: `Invalid form format` });
    }

    if (!name || name.trim().length === 0) {
      reject({ result: null, error: `Name not found` });
    }

    if (!item || item.trim().length === 0) {
      reject({ result: null, error: `Item not found` });
    }

    if (!phoneNumber || phoneNumber.trim().length === 0) {
      reject({ result: null, error: `Phone number not found` });
    }

    if (!phoneNumber.match(/^(\+234\d{10})$|^(0\d{10})$/)) {
      reject({ result: null, error: `Invalid phone number` });
    }

    resolve("Success");
  });
};
