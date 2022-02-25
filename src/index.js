let express = require('express');
let app = express();
const dotenv = require('dotenv')
const PUERTO = process.env.PORT || 4000;

//directorio public
// app.use('/resources', express.static('public'));
// app.use('/resources', express.static(__dirname + '/public'))

//settings
app.engine('html', require('ejs').renderFile)
app.use('/',require('./routes/routes'));


//Archivos estaticos
app.use
app.use(express.static(__dirname + '/public')) //seteamos la carpeta public para archivos estáticos


dotenv.config({path: './env/.env'}) //seteamos las variables de entorno


//llamar al router
app.use('/', require('./routes/routes'))

app.listen(PUERTO, ()=>{
    console.log('Servidor ejecutandose en http://localhost:' + PUERTO)
});