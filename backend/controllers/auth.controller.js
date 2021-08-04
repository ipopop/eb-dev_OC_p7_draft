'use strict'

const UsersModel = require('../models/user.model.sequelize');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

module.exports.signUp = async (req, res) => {
  const {usrPseudo, usrMail, usrPasswd} = req.body

  try {
    const user = await UsersModel.create({usrPseudo, usrMail, usrPasswd });
    res.status(201).json({ user: user.usrId});
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(500).send({ errors })
  }
}

module.exports.signIn = async (req, res) => {
  const { usrMail, usrPasswd } = req.body

  try {
    const user = await UsersModel.login(usrMail, usrPasswd);
    const token = createToken(user.usrId);
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(200).json({ user: user.usrId})
  } catch (err){
    const errors = signInErrors(err);
    res.status(500).json({ errors });
  }
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

console.log('backend/controllers/auth.controller.js 🚀');