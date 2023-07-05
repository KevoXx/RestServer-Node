const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')
const { response } = require('express')

const validarJWT = async (req, res = response, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición',
    })
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
    const usuario = await Usuario.findById(uid)
    // Verificar si el usuario existe en la BD
    if (!usuario) {
      return res.status(401).json({
        msg: 'Token no válido - usuario no existe en DB',
      })
    }
    // Verificar si el usuario está activo
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Token no válido - usuario con estado: false',
      })
    }
    req.usuario = usuario
    next()
  } catch (error) {
    return res.status(401).json({
      msg: 'Token no válido',
    })
  }

  next()
}

module.exports = {
  validarJWT,
}
