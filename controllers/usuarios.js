const { response } = require('express')

const usuariosGet = (req, res = response) => {
    const {q} = req.query
    console.log(q)

  res.json({ msg: 'get API - controlador' })
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    console.log({id})
  res.json({ msg: 'put API - controlador' })
}

const usuariosPost = (req, res = response) => {
    const {nombre,edad} = req.body
    console.log({nombre,edad})
  res.json({ msg: 'post API - controlador' })
}

const usuariosDelete = (req, res = response) => {
  res.json({ msg: 'delete API - controlador' })
}

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
}
