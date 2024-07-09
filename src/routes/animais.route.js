const { Router } = require('express')
const { auth } = require('../middleware/auth')
const AnimalController = require('../controllers/AnimalController')
// const {default: axios} = require('axios')

const animalRoutes = new Router()

// Rotas Destino

animalRoutes.post('/', auth, AnimalController.cadastrar)
animalRoutes.get('/', auth, AnimalController.listar)
animalRoutes.get('/:id', auth, AnimalController.listarUm)
animalRoutes.put('/:id', auth, AnimalController.atualizar)
animalRoutes.delete('/:id', auth, AnimalController.deletar)

module.exports = animalRoutes
