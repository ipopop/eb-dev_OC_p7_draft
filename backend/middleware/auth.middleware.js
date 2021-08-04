'use strict'

const jwt = require("jsonwebtoken");
const UsersModel = require("../models/User");
const pe = process.env;

module.exports.checkUser = (req, res, next) => {
  console.log('backend/middleware/auth.middleware.js => checkUser `req.cookies` 🍪 : ' + req.cookies);
  const token = req.cookies === undefined ? null : req.cookies.jwt;
  if (token) {
    jwt.verify(token, pe.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await UsersModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  console.log('backend/middleware/auth.middleware.js => requireAuth `req.cookies` 🍪 : ' + req.cookies);
  const token = req.cookies.jwt;
  if (token) {
    console.log('tok: ' + pe.TOKEN_SECRET);
    jwt.verify(token, pe.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(500).json('no token')
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
  }
};

console.log('backend/middleware/auth.middleware.js 🚀');