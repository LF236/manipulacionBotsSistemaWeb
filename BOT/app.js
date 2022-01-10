
require('dotenv').config();
require('colors');
const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');

const puerto = 5000;
//console.log(puerto);

// Configuración del directorio publico
const public_path = path.resolve(__dirname + '/public');
app.use(express.static(public_path));

// Configuración para procesar data de los formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}
// Configuración del archivos de rutas
const mainRoutes = require('./routes/mainRoutes');
app.use(cors());
app.use('/', mainRoutes);


// Ponemos a escuchar el servidor
app.listen(puerto, () => {
    console.log(`El servidor esta listo en http://localhost:${puerto}`.rainbow);
});