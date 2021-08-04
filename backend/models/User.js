'use strict'

const Sequelize = require("sequelize");
const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');

module.exports = sequelize.define("User", {
  usrId: {
    type: Sequelize.INTEGER(100),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  usrPseudo: {
    type: Sequelize.STRING(100),
    allowNull: false,
    minLength: 3,
    maxLength: 55,
    unique: true,
    trim: true
  },
  usrName: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  usrMail: {
    type: Sequelize.STRING(200),
    allowNull: false,
    validate: {
      isEmail: true
    },
    validate: [isEmail],
    lowercase: true,
    unique: true,
    fields: ['email'],
    trim: true
  },
  usrPasswd: {
    type: Sequelize.STRING(),
    // set(value) {
    //   // Storing passwords in plaintext in the database is terrible.
    //   // Hashing the value with an appropriate cryptographic hash function is better.
    //   this.setDataValue('password', hash(value));
    // },
    allowNull: false,
    max: 1024,
    len: [6, 256]
  },
  usrImgUrl: {
    type: Sequelize.STRING(),
    defaultValue: "./uploads/profile/blank_User.jpg"
  },
  usrBio: {
    type: Sequelize.STRING(),
    max: 1024,
  },
  usrRole: {
    type: Sequelize.STRING(),
    defaultValue: 1,
    max: 1024,
  },
  usrFollowing: {
    type: [Sequelize.STRING()]
  },
  usrFollowers: {
    type: [Sequelize.STRING()]
  },
  usrLikes: {
    type: [Sequelize.STRING()]
  },
  usrCreatedAt: Sequelize.DATE,
  usrUpdatedAt: Sequelize.DATE
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false,
  // underscored: true
});

console.log('backend/models/User.js 🚀');
