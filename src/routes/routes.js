const express = require("express");
const cors = require("cors");
const route = express.Router(); //instanciamos el constructor de express
const conexion = require("../database/db");
route.use(express.json()); //activamos uso de json
route.use(cors());

//routes
route.get("/", (req, res) => {
  res.render('index.html');
});

route.get("/", (req, res) => {
  conexion.query("SELECT * FROM consejos", (error, datos) => {
    if (error) {
      throw error;
    } else {
      res.send(datos);
    }
  });
});

//Insertar datos
route.post('/', (req,res)=>{
    let data = {
        "email" : req.body.email, 
        "nombre" :req.body.nombre,
        "mensaje" :req.body.mensaje,
    };
    let sql = "INSERT INTO consejos SET  ?"
    conexion.query(sql,data,(error, resultado)=>{
        if (error) {
            throw error;
        } else {           
            res.send(resultado);
        }
    })
});

module.exports = route