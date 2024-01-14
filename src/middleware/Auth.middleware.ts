import { RequestHandler } from "express";
import config from "../config";

const Auth: RequestHandler = async (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.replace("Bearer ", "");

  if (!token || token !== config.AUTH) {
    res.status(401).send({ result: null, error: `Invalid token` });
  } else {
    next();
  }
};

export default Auth;
