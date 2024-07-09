const { Router } = require('express')
const { auth } = require('../middleware/auth')

const UsuarioController = require('../controllers/UsuarioController')

const usuarioRoutes = new Router()
// const router = express.Router(); // Correção: usar express.Router() para criar o roteador

//Rotas Usuarios

usuarioRoutes.post('/', UsuarioController.cadastrarUsuario)
usuarioRoutes.get('/', auth, UsuarioController.listar)
usuarioRoutes.get('/:id', auth, UsuarioController.listarUm)
usuarioRoutes.put('/:id', auth, UsuarioController.atualizar)
usuarioRoutes.delete('/:id', auth, UsuarioController.excluir)


module.exports = usuarioRoutes
    

