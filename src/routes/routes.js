const { Router } = require("express");
const usuarioRoutes = require("./usuarios.routes");
const loginRoutes = require("./login.route");
const plantaRoutes = require("./plantas.route");
const animalRoutes = require("./animais.route");
// // const swaggerUi = require('swegger-ui-express')
// // const swaggerDocument = require('.doc.swagger.json')

const routes = Router();

// routes.use('./docs', swaggerUi.serve, swagger.Ui.setup(swaggerDocument))
routes.use('/usuarios', usuarioRoutes);
routes.use('/login', loginRoutes);
routes.use('/plantas', plantaRoutes);
routes.use('/animais', animalRoutes);

module.exports = routes