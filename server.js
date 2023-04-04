const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env config
dotenv.config();

//router import
const userRoutes = require("./routes/userRoutes");

//mongodb connection

connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes

app.use("/api/v1/user", userRoutes);

//Port

const PORT = process.env.PORT || 27017;

//listen

app.listen(PORT, () => {
  console.log(
    `Server listening on ${process.env.DEV_MODE} port no ${PORT}`.bgCyan.white
  );
});
