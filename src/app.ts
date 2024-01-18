import express from "express";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import AddTicket from "./controllers/AddTicket.controller";
import { json } from "body-parser";
import GetTicket from "./controllers/GetTicket.controller";
import Auth from "./middleware/Auth.middleware";
import PDF from "./controllers/PDF.controller";
import mustache from "mustache-express";
import CreatePDF from "./utils/CreatePDF";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.disable("view cache");
app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.use("/static", express.static(path.resolve(__dirname, "../public")));

app.get("/", (req, res) => {
  res.send({ err: null, result: "Connected" });
});

app.use(Auth);

app.get("/public", PDF, (req, res) => {
  res.render("Sheet", {});
});

app.post("/donate", AddTicket);
app.get("/donate/pdf", CreatePDF);
// app.get("/donate/json", GetTicket);

app.all("*", (req, res) => {
  res.status(404).send({ err: "Route not found", result: null });
});
