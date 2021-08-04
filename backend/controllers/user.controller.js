'use strict'

const { sequelize } = require('../utils/database/db.sequelize');
// const UsersModel = require("../models/user.model.sequelize");
// const ObjectID = require("mongoose").Types.ObjectId;
// const ObjectID = require("sequelize");
const bcrypt = require("bcrypt")
const token = require("../middleware/jwt.token")
// const fs = require("fs")
const { Op } = require("sequelize")

exports.signup = async (req, res) => {
  try {
    const user = await sequelize.UsersModel.findOne({
      where: { usrMail: req.body.usrMail },
    });
    if (user !== null) {
      if (user.usrPseudo === req.body.usrPseudo) {
        return res.status(400).json({ error: "ce pseudo est déjà utilisé" });
      }
    } else {
      const hash = await bcrypt.hash(req.body.usrPasswd, 10);
      const newUser = await sequelize.UserModel.create({
        usrPseudo: req.body.usrPseudo,
        usrMail: req.body.usrMail,
        usrPasswd: hash,
        usrRole: false,
      });

      const tokenObject = await token.issueJWT(newUser);
      res.status(201).send({
        user: newUser,
        token: tokenObject.token,
        expires: tokenObject.expiresIn,
        message: `Votre compte est bien créé ${newUser.usrPseudo} !`,
      });
    }
  } catch (error) {
    return res.status(400).send({ error: "email déjà utilisé" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await sequelize.UsersModel.findOne({
      where: { usrMail: req.body.usrMail },
    }); 
    if (user === null) {
      return res.status(403).send({ error: "Connexion échouée" });
    } else {
      const hash = await bcrypt.compare(req.body.usrPasswd, user.usrPasswd); 
      if (!hash) {
        return res.status(401).send({ error: "Mot de passe incorrect !" });
      } else {
        const tokenObject = await token.issueJWT(user);
        res.status(200).send({
          user: user,
          token: tokenObject.token,
          sub: tokenObject.sub,
          expires: tokenObject.expiresIn,
          message: "Hello " + user.usrPseudo + " 😃",
        });
      }
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur : " + error });
  }
};

// get all users (except 'admins')
exports.getAllUsers = async (req, res) => {
  try {
    const users = await sequelize.UsersModel.findAll({
      attributes: ['usrPseudo', 'usrId', 'usrImgUrl', 'usrBio', 'usrMail'],
      where: {
        usrId: {
          [Op.ne]: 1,
        },
      },
    });
    console.log(users.every(user => user instanceof User)); // true
    console.log("All users:", JSON.stringify(users, null, 2));
    res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur : " + error });
  }
};

// module.exports.getAllUsers = async (req, res) => {
//   const users = await UsersModel.find().select("-usrPasswd");
//   res.status(200).json(users);
// };

// module.exports.userInfo = (req, res) => {
  // if (!ObjectID.isValid(req.params.id))
  //   return res.status(400).send("ID unknown : " + req.params.id);

//   UsersModel.findById(req.params.usrId, (err, docs) => {
//     if (!err) res.send(docs);
//     else console.log("ID unknown : " + err);
//   }).select("-usrPasswd");
// };

exports.userInfo = async (req, res) => {
  try {
    const users = await sequelize.UsersModel.findOne({
      where: { usrId: req.params.usrId },
      where: {
        usrId: {
          [Op.ne]: 1,
        },
      },
    });
    res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur : " + error });
  }
};

module.exports.updateUser = async (req, res) => {
  // if (!ObjectID.isValid(req.params.id))
  //   return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await sequelize.UsersModel.findOneAndUpdate(
      { usrId: req.params.usrId },
      {
        $set: {
          usrBio: req.body.usrBio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  // if (!ObjectID.isValid(req.params.id))
  //   return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await sequelize.UsersModel.remove({ usrId: req.params.usrId }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.follow = async (req, res) => {
  // if (
  //\  !ObjectID.isValid(req.params.id) ||
  //\  !ObjectID.isValid(req.body.idToFollow)
  //  )
  //   return res.status(400).send("ID unknown : " + req.params.id);

  try {
    // add to the follower list
    await sequelize.UsersModel.findByIdAndUpdate(
      req.params.usrId,
      { $addToSet: { following: req.body.usrFollowing } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).jsos(err);
      }
    );
    // add to following list
    await sequelize.UsersModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.usrFollowers } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).jsos(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.unfollow = async (req, res) => {
  /*if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);
  */
  try {
    await sequelize.UsersModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.usrFollowers } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).jsos(err);
      }
    );
    // remove to following list
    await sequelize.UsersModel.findByIdAndUpdate(
      req.body.usrFollowers,
      { $pull: { followers: req.params.usrId } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).jsos(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

console.log('backend/controllers/user.controller.js 🚀');