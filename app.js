require('colors');
require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const https = require('https');
const fs = require('fs');
const app = express();

const puerto = process.env.PUERTO_SERVIDOR;
//console.log(puerto);

// Configuración para sesiones
app.use(session({ secret: 'sistema-bots' }));

// Configuración del directorio publico
const public_path = path.resolve(__dirname + '/public');
app.use(express.static(public_path));

// Configuración para procesar data de los formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Configuración del archivos de rutas
const mainRoutes = require('./routes/mainRoutes');
app.use('/', mainRoutes);

// Establecemos el motor de vistas que vamos a utilizar en el proyecto
app.set('view engine', 'ejs');

// Cargamos la configuracion de los CERTIFICADOS
const httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}
// Middleware global para solucionar un error 404
app.use(function (req, res, next) {
    res.status(404).render('error', {
        "msg": '¡¡¡Recurso no encontrado!!!',
        "msgEnlace": "Ir al Home",
        "uri": "/home"
    });
});

// Ponemos a escuchar el servidor
https.createServer(httpsOptions, app).listen(puerto, () => {
    console.log(`El servidor esta listo en http://localhost:${puerto}`.rainbow);
});