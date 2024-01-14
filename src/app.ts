import express from "express";
import helmet from "helmet";
import cors from "cors";
import AddTicket from "./controllers/AddTicket.controller";
import { json } from "body-parser";
import GetTicket from "./controllers/GetTicket.controller";
import Auth from "./middleware/Auth.middleware";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send({ err: null, result: "Connected" });
});

app.use(Auth);

app.get("/donate", GetTicket);
app.post("/donate", AddTicket);

app.all("*", (req, res) => {
  res.status(404).send({ err: "Route not found", result: null });
});
