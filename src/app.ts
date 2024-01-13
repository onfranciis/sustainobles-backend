import express from "express";
import helmet from "helmet";
import cors from "cors";

export const app = express();

app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ err: null, result: "Connected" });
});

app.all("*", (req, res) => {
  res.status(404).send({ err: "Route not found", result: null });
});
