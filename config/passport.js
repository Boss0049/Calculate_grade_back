const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../models");

// console.log("A");
const options = {
  jwtFromRequest: function (req) {
    var token = null;
    if (req && req.cookies) token = req.cookies["jwt"];
    return token;
  },
  secretOrKey: process.env.SECRET_KEY,
};

// console.log("B");

const jwtStrategy = new Strategy(options, async (payload, done) => {
  const targetUser = await db.User.findOne({ where: { id: payload.id } });

  if (targetUser) {
    done(null, targetUser);
  } else {
    done(null, false);
  }
});

passport.use("personal-auth", jwtStrategy);
