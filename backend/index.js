import express from "express";
import cors from "cors";
import "./db/conn.js";
import bodyParser from "body-parser";


import Rout from "./routes/router.js";

const app = express();


app.use(express.json());
app.use(cors())

// use body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

app.use("/uploads", express.static("./uploads"));
app.use("/api", Rout);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
