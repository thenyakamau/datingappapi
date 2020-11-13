const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

function generateJwtToken(user) {
  return JWT.sign(
    {
      iss: "datingapi",
      sub: user.unique_id,
      iat: new Date().getTime(), //! current time
      exp: new Date().setDate(new Date().getDate() + 1), //! expiration time
    },
    process.env.JWT_KEY
  );
}

module.exports = generateJwtToken;
