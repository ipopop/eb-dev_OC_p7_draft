'use strict'

const express = require('express')
const path = require("path");
const logger = require("./middleware/logger");
const helmet = require('helmet')
// const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors')

require('dotenv').config()

// const cookieParser = require('cookie-parser')
// const userRoutes = require('./routes/user.routes')
// const postRoutes = require('./routes/post.routes')
// const path = require('path')
// const csrf = require('csurf')

const app = express()
app.use(helmet())
app.disable('x-powered-by')

// Init middleware
app.use(logger);

//Cors
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Set static folder
// app.use(express.static(path.join(__dirname, "public")));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})


// Jwt
// app.get('*', checkUser);
// app.get('/jwtid', requireAuth, (req, res) => {
// //   app.get('*');
// //   app.get('/jwtid', (req, res) => {
//   res.status(200).send(res.locals.user.usrId)
// });


app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));

// app.use('/api/users', userRoutes);
// app.use('/api/post', postRoutes);

// app.use(csrf())

// const {checkUser, requireAuth} = require('./middleware/auth.middleware')

module.exports = app

console.log('backend/app.js 🚀');