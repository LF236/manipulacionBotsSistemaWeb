const buscarComando = require('../helpers/buscarComando');
const encenderServicio = require('../helpers/encenderServicio');
const apagarServicio = require('../helpers/apagarServicio');
const ip = require('ip');
const axios = require('axios');
const mainControllers = {
    home: (req, res) => {
        res.send('Hola');
    },

    buscarComando: async (req, res) => {
        let { comando } = req.query;
        // Buscamos el comando
        let busquedaComando = await buscarComando(comando);
        console.log('HOLA');
        // Si el comando existe, retornamo un true
        if (busquedaComando) {
            // Si el comando existe, enviamos una peticion al servidor central para que sea agregado a la DB
            console.log(process.env.IPSERVIDORCENTRAL);
            console.log(`http://${process.env.IPSERVIDORCENTRAL}:3000/agregarServicioBot`);
            axios.post(`http://${process.env.IPSERVIDORCENTRAL}:3000/agregarServicioBot`, {
                data: {
                    "hostname": process.env.HOSTNAME,
                    "dirIp": ip.address(),
                    "token": "ayuwoki",
                    "servicio": comando
                }
            }).then(resultado => {
                console.log(resultado.data);
                return res.send(resultado.data)
            })

        }
        else {
            return res.send({
                "res": false,
                "msg": "El servicio no se encuentra disponible en el bot"
            });
        }
    },

    encenderServicio: async (req, res) => {
        const { servicioEncender, host } = req.query;
        // Encendemos el servicio
        let encenderSer = await encenderServicio(servicioEncender);
        /* 
            Si el servicio se enciende correctamente, hacemos una peticion al servidor centrar para actualizar
            la informacion del bot
        */
        if (encenderSer) {
            axios.post(`http://${process.env.IPSERVIDORCENTRAL}:3000/actualizarEstadoServicio`, {
                data: {
                    "hostname": process.env.HOSTNAME,
                    "dirIp": ip.address(),
                    "token": "ayuwoki",
                    "servicio": servicioEncender
                }
            }).then(resultado => {
                // SI el resultado es correcto notificamos al front-end del servidor de que todo esa bien

                return res.send({
                    "res": true,
                    "msg": "El servicio se ha encendido correctamente, clic para recargar la página"
                });
            })
        }
    },

    apagarServicio: async (req, res) => {
        const { servicioApagar, host } = req.query;
        apagarServicio(servicioApagar)
            .then(apagarSer => {
                console.log(apagarSer);
                /*
                    Si el servicio se apago correctamente, hacemos una peticion al servidor para actualizar la 
                    información del BOT
                */
                if (apagarSer) {
                    axios.post(`http://${process.env.IPSERVIDORCENTRAL}:3000/actualizarEstadoServicioApagado`, {
                        data: {
                            "hostname": process.env.HOSTNAME,
                            "dirIp": ip.address(),
                            "token": "ayuwoki",
                            "servicio": servicioApagar
                        }
                    }).then(resultado => {
                        // SI el resultado es correcto notificamos al front-end del servidor de que todo esa bien
                        console.log(resultado);
                        return res.send({
                            "res": true,
                            "msg": "El servicio se ha apagado correctamente, clic para recargar la página"
                        });
                    })
                }
            })


    }
};

module.exports = mainControllers;