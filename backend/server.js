'use strict'

const { sequelize, dbConnect } = require('./utils/database/db.sequelize');
const http = require('http')
const app = require('./app')

const normalizePort = val => {
  const port = parseInt(val, 10)
  
  if (isNaN(port)) { return val }
  
  if (port >= 0) { return port }
}

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

// errors
const errorHandler = error => {
  if (error.syscall !== 'listen') { throw error }
  
  const address = server.address()
  const bind = (typeof address === 'string') ? ('pipe ' + address) : ('port: ' + port)
  
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.')
      process.exit(1)
      break

    case 'EADDRINUSE':
      console.error(bind + ' is already in use.')
      process.exit(1)
      break

    default:
      throw error
  }
}

const server = http.createServer(app)

sequelize.sync().then( () => {
  // dbConnect()

  server.on('error', errorHandler)
  
  server.on('listening', () => {
    const address = server.address()
    const bind = (typeof address === 'string') ? ('pipe ' + address) : port
    console.log('Listening on http://localhost:' + bind + ' 🚀')

    server.on('connection', () => {
      console.log('someone connected!');
    });
  })
  
  server.listen(port)
})


console.log('backend/server.js 🚀');