const passport = require("passport");
const localstrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config({ path: ".env" });

// function createPassport(user) {
//   passport.use(
//     new localstrategy({ usernameField: "phone" }, (user, done) => {
//       if (!user) {
//         return done(null, false, { message: "Could not find user" });
//       }
//       return done(null, user);
//     })
//   );
// }

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: process.env.JWT_KEY,
    },
    (payload, done) => {
      try {
        User.findOne({
          where: {
            unique_id: payload.sub,
          },
        })
          .then((user) => {
            return done(null, user);
          })
          .catch((error) => {
            return done(null, false, { message: "Could not find user" });
          });
      } catch (error) {
        return done(null, false, { message: "something went wrong" });
      }
    }
  )
);
