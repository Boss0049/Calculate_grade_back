require("dotenv").config();
require("./config/passport");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const db = require("./models");
const userRoutes = require("./routers/user");
const calculateRoutes = require("./routers/calculate");
const cookieParser = require("cookie-parser");
const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.static("./images"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      `${process.env.FRONT_URL}`,
      "http://localhost:3000",
      "https://mypage.com",
    ],
    credentials: true,
  })
);

app.use("/users", userRoutes);
app.use("/calculates", calculateRoutes);

db.sequelize.sync({ force: false }, { alter: false }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is Running Port ${process.env.PORT}`);
  });
});
