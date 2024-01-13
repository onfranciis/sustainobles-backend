import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 1234,
  DB:{
    URL: process.env.DB_URL||''
  }
};
