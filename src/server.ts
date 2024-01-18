import { connect } from "mongoose";
import { app } from "./app";
import config from "./config";

connect(config.DB.URL)
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}...`);
    });
  })
  .catch((err) => {
    console.log(`Invalid URL`);
  });

process.on("uncaughtException", (err) => {
  console.log(err);
});
