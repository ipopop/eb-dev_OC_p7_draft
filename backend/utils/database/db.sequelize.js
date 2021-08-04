'use strict'

const Sequelize = require("sequelize");

require('dotenv').config({ path: './.env' });
const pe = process.env;

// connect to DB
const sequelize = new Sequelize(
  pe.DB_NAME,
  pe.DB_USR,
  pe.DB_PASSWD,
  {
    dialect: 'mysql',
    host: pe.DB_HOST,
    logging: false
  }
)

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL database connected via Sequelize 🚀');
    // sequelize.query("SELECT users.usrId as 'usrId', users.usrPseudo as 'usrPseudo', posts.postId as 'postId', posts.postTxt as 'postTxt', posts.postCreatedAt as 'postCreatedAt' FROM posts JOIN users on users.usrId = posts.usrId").then(([results, metadata]) => {
      //   console.log(results);
      // })
      // sequelize.close();
      // console.log('MySQL database connection closed via Sequelize 🚀');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, dbConnect };
global.sequelize = sequelize;

console.log('backend/utils/db.sequelize.js 🚀');