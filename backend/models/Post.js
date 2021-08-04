'use strict'

const Sequelize = require("sequelize");

module.exports = sequelize.define("Post", {
  postId: {
    type: Sequelize.INTEGER(100),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  postTitle: {
    type: Sequelize.STRING(),
    allowNull: false,
  },
  postTxt: {
    type: Sequelize.TEXT(),
    allowNull: false,
  },
  postImgUrl: {
    type: Sequelize.STRING(),
    defaultValue: "./uploads/profile/blank_User.jpg"
  },
  usrId: {
    type: Sequelize.STRING()
  },
  postCreatedAt: Sequelize.DATE,
  postUpdatedAt: Sequelize.DATE
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false,
  // underscored: true
});

console.log('backend/models/Post.js 🚀');
