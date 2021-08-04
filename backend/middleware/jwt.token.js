'use strict'

const JWT = require("jsonwebtoken");/*package pour créer et verifier les tokens d'authentification */
// const config = require("../config/db.config");

// token
function issueJWT(user) {
  const id = user.usrId;
  const expiresIn = "24H";
  const payload = {
    sub: id,
    iat: Date.now(),
  }
  const signedToken = JWT.sign(payload, "secret", { expiresIn: expiresIn });
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  }
}

// check token
function getUserId(req) {
  const token = req.headers.authorization.split(" ")[1]; 
  const decodedToken = JWT.verify(token, "secret"); 
  const userId = decodedToken.sub;
  return userId; 
}

module.exports.issueJWT = issueJWT;
module.exports.getUserId = getUserId;

console.log('backend/middleware/jwt.token.js 🚀');