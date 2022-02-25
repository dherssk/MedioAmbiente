const conexion = require("../database/db");

// funcion para seleccionar y listar consejos
exports.consejos = async (req, res) => {
  try {
    conexion.query("SELECT * FROM consejosadmin", (error, resultado) => {
      if (error) {
        throw error;
      } else {
        res.send(resultado);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.SelectConsejo = async (req, res) =>{
  try {
    conexion.query("SELECT * FROM consejosadmin WHERE id = ?",
    [req.params.id],
    (error, resultado) => {
      if (error) {
        throw error;
      } else {
        res.send(resultado);
      }
    }
  );
  } catch (error) {
    console.log(error);
  }
}

// funcion para insertar consejos
exports.enviarConsejo = async (req, res) =>{
  try{
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
  }catch (error) {
    console.log(error);
  }
}
