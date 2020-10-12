const express = require("express");
const router = express.Router();
const controller = require("../controllers/calculate");
const passport = require("passport");

const auth = passport.authenticate("personal-auth", { session: false });

router.post("/grade", controller.grade);

module.exports = router;
