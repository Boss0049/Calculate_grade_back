require("dotenv").config();
require("./config/passport");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const db = require("./models");
const userRoutes = require("./routers/user");
const calculateRoutes = require("./routers/calculate");
const app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static("./images"));
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRoutes);
app.use("/calculates", calculateRoutes);

db.sequelize.sync({ force: false }, { alter: false }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is Running Port ${process.env.PORT}`);
  });
});
