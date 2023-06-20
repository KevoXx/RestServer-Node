const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../db/config')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.usuariosPath = '/api/usuarios'

    //Conección a la base de datos
    this.conectarDB()

    // Middlewares
    this.middlewares()

    this.routes()
  }

  async conectarDB() {
    await dbConnection()
  }

  middlewares() {
    // CORS
    this.app.use(cors())
    // Parseo y lectura del body
    this.app.use(express.json())
    // Directorio público
    this.app.use(express.static('public'))

  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/user.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto 8080 🚀')
    })
  }
}

module.exports = Server
