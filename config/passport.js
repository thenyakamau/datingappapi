const passport = require("passport");
const localstrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const dotenv = require("dotenv");
const { fetchUserByUuid } = require("../models/user");

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
    async (payload, done) => {
      try {
        fetchUserByUuid(payload.sub, (error, result) => {
          if (error) {
            return done(null, false, { message: "something went wrong" });
          }
          if (result != null && result.length > 0) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Could not find user" });
          }
        });
      } catch (error) {
        return done(null, false, { message: "something went wrong" });
      }
    }
  )
);
