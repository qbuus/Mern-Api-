import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import mongoose from "mongoose";

const PORT = process.env.SERVER_PORT || 8001;
const MONGO_URI = process.env.MONGO_CONNECTION_STRING as string;

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

mongoose.Promise = Promise;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("mongoDB connected");

    server.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

mongoose.connection.on("error", (error: Error) => {
  console.error(error);
});
