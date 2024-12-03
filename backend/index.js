import express from "express";
import dotenv from "dotenv";

import entityRoutes from "./routes/entityRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import connectToDatabase from "./db.js";

const app = express();
const PORT = process.env.PORT;

dotenv.config();
connectToDatabase();

app.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, OPTIONS",
  );
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Welcome");
  res.send("yo");
});

app.use("/create", entityRoutes);
app.use("/", homeRoutes);

app.listen(PORT, (error) => {
  if (!error) {
    console.log("starting server at localhost:" + PORT);
  } else {
    console.error("Error starting server" + error);
  }
});
