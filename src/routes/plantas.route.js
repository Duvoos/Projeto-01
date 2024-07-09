const { Router } = require('express')
const { auth } = require('../middleware/auth')

const PlantaController = require('../controllers/PlantaController');

const plantaRoutes = new Router()

// Rotas Plantas
plantaRoutes.post('/', auth, PlantaController.cadastrar);
plantaRoutes.get('/', auth, PlantaController.listar);
plantaRoutes.get('/:id', auth, PlantaController.listarUm);
plantaRoutes.put('/:id', auth, PlantaController.atualizar);
plantaRoutes.delete('/:id', auth, PlantaController.deletar);

module.exports = plantaRoutes