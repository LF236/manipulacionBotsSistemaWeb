require('colors');
require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();

const puerto = process.env.PUERTO_SERVIDOR;
console.log(puerto);

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

// Ponemos a escuchar el servidor
app.listen(puerto, () => {
    console.log(`El servidor esta listo en http://localhost:${puerto}`.rainbow);
});