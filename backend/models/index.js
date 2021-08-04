'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// const Sequelize = require('sequelize');
const PostModel = require('./models/post.js');
const UserModel = require('./models/user.js');
const CommentModel = require('./models/comment.js');
const LikeModel = require('./models/like.js');

// const sequelize = new Sequelize({
//   dialect: 'mysql',
//   store: ':memory'
// });

const Post = PostModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);
const Like = LikeModel(sequelize, Sequelize);

Post.belongsTo(User, {
  as: 'author'
});

Post.hasMany(Comment);

Post.hasMany(Like);

User.hasMany(Post, {
  foreignKey: 'authorId'
});

User.hasMany(Comment, {
  foreignKey: 'authorId'
});

User.hasMany(Like);

Comment.belongsTo(User, {
  as: 'author'
});

Comment.belongsTo(Post);

Comment.belongsTo(Comment, {
  as: 'parent'
});

Comment.hasMany(Comment, {
  foreignKey: 'parentId',
  as: 'response'
});

Comment.hasMany(Like);

Like.belongsTo(User, {
  as: 'author'
});

Like.belongsTo(Post);

Like.belongsTo(Comment);

module.exports = {
  sequelize,
  Sequelize,
  Post,
  User,
  Comment,
  Like
}

console.log('backend/models/index.js 🚀');
