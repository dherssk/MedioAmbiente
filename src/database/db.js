const mysql = require('mysql')

const conexion = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'consejos_verdes',
})

conexion.connect( (error)=> {
    if(error){
        console.log('El error de conexión es: ' + error)
        return
    }
    console.log('¡Conectado a la base de datos!')
})

module.exports = conexion