const express = require('express')
const cors = require('cors')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 8080;
    this.usuariosPath = '/api/usuarios'

    // Middlewares

    this.middlewares()

    this.routes()
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
      console.log('Servidor corriendo en el puerto 8080')
    })
  }
}

module.exports = Server
