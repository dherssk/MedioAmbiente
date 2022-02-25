const express = require("express");
const cors = require("cors");
const route = express.Router(); //instanciamos el constructor de express
const conexion = require("../database/db");
const authController = require('../controllers/AuthControllers')
route.use(express.json()); //activamos uso de json
route.use(cors());

//routes
route.get("/", (req, res) => {
  res.render('index.html');
});

// Mostatrar Consejos
route.get("/consejos", authController.consejos);

// Mostrar consejo seleccionado
route.get("/consejos/:id", authController.SelectConsejo);

//Insertar datos
route.post('/', authController.enviarConsejo);

module.exports = route