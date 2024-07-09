const { Router } = require('express')
// const Usuarios = require('../models/Usuario')

const LoginController = require('../controllers/LoginController')

// const loginRoutes = new Router()
const loginRoutes = Router(); // Criação correta do roteador
//Rota Login

loginRoutes.post('/', LoginController.login)

module.exports = loginRoutes