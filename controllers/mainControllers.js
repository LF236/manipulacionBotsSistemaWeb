const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const { v4: uuid } = require('uuid');
const tokenGenerator = require('uuid-token-generator');
const db = require('../database/models');
require('colors');
const mainControllers = {
    index: (req, res) => {
        console.log(req);
        res.send('Hola');
    },

    showLogin: (req, res) => {
        // Si hay una sesion activa, el login no debe ser mostrado
        if (req.session.tokenSesion) {
            return res.redirect('/home');
        }
        // Si no hay sesion el acceso al login se permite
        return res.render('login', {
            "primerError": null,
            "old": null
        });
    },

    processLogin: async (req, res) => {
        let errors = validationResult(req);

        // Verificamos si no hay errores en express-validator
        if (errors.isEmpty()) {
            // Buscamos la información del usuario en base al campo user
            const { user, password } = req.body;
            const data = await db.Usuario.findAll({
                where: {
                    usuario: user
                },
                raw: true
            });

            // Si data es igual a un arreglo vacio, quiere decir que el usuario no existe
            if (data.length == 0) {
                return res.render('login', {
                    "primerError": {
                        msg: "El usuario no existe"
                    },
                    "old": req.body
                })
            }

            // Verificamos si la contraseña es la misma, si no mandar mensaje de ERROR
            if (!bcryptjs.compareSync(password, data[0].password)) {
                return res.render('login', {
                    "primerError": {
                        msg: "Contraseña Incorrecta"
                    },
                    "old": req.body
                })
            }

            // Si se cumplen todas las condiciones iniciamos sesion
            let tokenRandom = new tokenGenerator().generate()
            let userID = data[0].id;
            // Le asignamos un token a la sesión
            req.session.tokenSesion = tokenRandom;
            // Guardamos la informacion de la sesion en la DB
            await db.SesionUsuario.create({
                id_usuario: userID,
                token: tokenRandom
            });
            console.log(userID);
            return res.redirect('/home');
        }
        const primerError = errors.mapped()[`${Object.entries(errors.mapped())[0][0]}`];
        return res.render('login', {
            "primerError": primerError,
            "old": req.body
        })

    },

    home: async (req, res) => {
        /* 
            Verificamos si hay un token de sesion configurado, si no lo hay entonces mandamos un mensaje de error
            de privilegios
        */
        if (!req.session.tokenSesion) {
            return res.render('error', {
                "msg": '¡¡¡No tienes los permisos suficientes para entar aqui!!!',
                "msgEnlace": "Ir al Login",
                "uri": "/"
            })
        }
        console.log(req.session.tokenSesion);
        // Si hay una sesión activa buscamos los datos del usuario a través del token en la table SesionUsario
        const infoSesion = await db.SesionUsuario.findAll({
            where: {
                token: req.session.tokenSesion
            },
            raw: true
        });
        // Obtenemos el id del usuario que se relaciona con el token de la sesion
        let idUsuarioPertenecienteSesion = infoSesion[0].id_usuario;
        // Buscamos la informacion del usuario a partir de su ID
        let infoUsuario = await db.Usuario.findByPk(idUsuarioPertenecienteSesion, {
            raw: true
        });

        // Obtenemos la informacion de todos los bots para que sea impresos en la vista
        let botsInfo = await db.Bot.findAll({
            raw: true
        });

        //console.log(botsInfo);
        return res.render('home', {
            nombreUsuario: infoUsuario.nombre,
            listaBots: botsInfo
        });
    },

    infoBot: async (req, res) => {
        /* 
            Verificamos si hay un token de sesion configurado, si no lo hay entonces mandamos un mensaje de error
            de privilegios
        */
        if (!req.session.tokenSesion) {
            return res.render('error', {
                "msg": '¡¡¡No tienes los permisos suficientes para entar aqui!!!',
                "msgEnlace": "Ir al Login",
                "uri": "/"
            })
        }

        // Si hay una sesión activa buscamos los datos del usuario a través del token en la table SesionUsario
        const infoSesion = await db.SesionUsuario.findAll({
            where: {
                token: req.session.tokenSesion
            },
            raw: true
        });
        // Obtenemos el id del usuario que se relaciona con el token de la sesion
        let idUsuarioPertenecienteSesion = infoSesion[0].id_usuario;
        // Buscamos la informacion del usuario a partir de su ID
        let infoUsuario = await db.Usuario.findByPk(idUsuarioPertenecienteSesion, {
            raw: true
        });

        const { nombreBot, host } = req.params;
        const infoBot = await db.Bot.findAll({
            where: {
                nombreBot: nombreBot,
                hostname: host
            },

            limit: 1,
        });

        let idBot = infoBot[0].id;
        // Buscamos los servicios relacionados con el bot
        let servicios = await db.ServicioBot.findAll({
            where: {
                id_bot: idBot
            },
            raw: true
        })

        return res.render('infoBot', {
            nombreUsuario: infoUsuario.nombre,
            infoBot: infoBot[0],
            servicios: servicios
        });
    },

    addBot: async (req, res) => {
        /* 
            Verificamos si hay un token de sesion configurado, si no lo hay entonces mandamos un mensaje de error
            de privilegios
        */
        if (!req.session.tokenSesion) {
            return res.render('error', {
                "msg": '¡¡¡No tienes los permisos suficientes para entar aqui!!!',
                "msgEnlace": "Ir al Login",
                "uri": "/"
            })
        }

        // Si hay una sesión activa buscamos los datos del usuario a través del token en la table SesionUsario
        const infoSesion = await db.SesionUsuario.findAll({
            where: {
                token: req.session.tokenSesion
            },
            raw: true
        });
        // Obtenemos el id del usuario que se relaciona con el token de la sesion
        let idUsuarioPertenecienteSesion = infoSesion[0].id_usuario;
        // Buscamos la informacion del usuario a partir de su ID
        let infoUsuario = await db.Usuario.findByPk(idUsuarioPertenecienteSesion, {
            raw: true
        });

        return res.render('agregarBot', {
            nombreUsuario: infoUsuario.nombre,
            "primerError": null,
            "old": null
        });
    },

    agregarBot: async (req, res) => {
        let errors = validationResult(req);
        /* 
            Verificamos si el bot (hostname, ip, usuario) ya estan registrado, no se puede registrar un bot
            en donde la IP y el hostname sea el mismo
        */
        let busquedaBot = await db.Bot.findAll({
            raw: true,
            where: {
                direccionIP: req.body.ip,
                hostname: req.body.host,
            }
        });


        // Si hay un bot que coincide con esos datos mandamos el error de que el bot ya esta registrado
        if (busquedaBot.length > 0) {
            return res.render('agregarBot', {
                nombreUsuario: "hehe",
                "primerError": {
                    "msg": "La direccion IP y el Hostname ya se encuentran almacenados en la DB"
                },
                "old": req.body
            })
        }
        // Verificamos si no hay errores en express-validator
        if (errors.isEmpty()) {
            // Si no los hay, registramos el BOT en la DB
            await db.Bot.create({
                id: uuid(),
                direccionIP: req.body.ip,
                nombreBot: req.body.name,
                hostname: req.body.host,
                password: bcryptjs.hashSync(req.body.password, 12)
            });
            // Redireccionamos a la vista con la información del BOT
            return res.redirect(`/infoBot/${req.body.name}/${req.body.host}`);
        }
        // Si hay errores, renderizamos la vista del formualario de agregar BOT con su error
        const primerError = errors.mapped()[`${Object.entries(errors.mapped())[0][0]}`];
        return res.render('agregarBot', {
            nombreUsuario: "hehe",
            "primerError": primerError,
            "old": req.body
        })
    },

    editarBot: async (req, res) => {
        /* 
            Verificamos si hay un token de sesion configurado, si no lo hay entonces mandamos un mensaje de error
            de privilegios
        */
        if (!req.session.tokenSesion) {
            return res.render('error', {
                "msg": '¡¡¡No tienes los permisos suficientes para entar aqui!!!',
                "msgEnlace": "Ir al Login",
                "uri": "/"
            })
        }
        // Si hay una sesión activa buscamos los datos del usuario a través del token en la table SesionUsario
        const infoSesion = await db.SesionUsuario.findAll({
            where: {
                token: req.session.tokenSesion
            },
            raw: true
        });
        // Obtenemos el id del usuario que se relaciona con el token de la sesion
        let idUsuarioPertenecienteSesion = infoSesion[0].id_usuario;
        // Buscamos la informacion del usuario a partir de su ID
        let infoUsuario = await db.Usuario.findByPk(idUsuarioPertenecienteSesion, {
            raw: true
        });

        // Buscamos los datos actuales del bot
        const { nombreBot, host } = req.params;
        const infoBot = await db.Bot.findAll({
            where: {
                nombreBot: nombreBot,
                hostname: host
            },

            limit: 1,
        });
        res.render('editarBot', {
            "nombreUsuario": infoUsuario.nombre,
            "primerError": null,
            "old": null,
            "infoBot": infoBot[0]
        });
    },

    editarBotPost: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const { nombreBot, host, ip } = req.params;
            let botActual = await db.Bot.findAll({
                where: {
                    direccionIP: ip,
                    nombreBot: nombreBot,
                    hostname: host
                },
                raw: true,
                limit: 1
            });
            let idBotActual = botActual[0].id;
            await db.Bot.update(
                {
                    hostname: req.body.host,
                    direccionIP: req.body.ip,
                    nombreBot: req.body.name,
                    password: bcryptjs.hashSync(req.body.password, 12)
                },
                {
                    where: { id: idBotActual }
                }
            );

            return res.redirect(`/infoBot/${req.body.name}/${req.body.host}`);
        }

        // Si hay una sesión activa buscamos los datos del usuario a través del token en la table SesionUsario
        const infoSesion = await db.SesionUsuario.findAll({
            where: {
                token: req.session.tokenSesion
            },
            raw: true
        });
        // Obtenemos el id del usuario que se relaciona con el token de la sesion
        let idUsuarioPertenecienteSesion = infoSesion[0].id_usuario;
        // Buscamos la informacion del usuario a partir de su ID
        let infoUsuario = await db.Usuario.findByPk(idUsuarioPertenecienteSesion, {
            raw: true
        });
        // Si hay errores, renderizamos la vista del formualario de agregar BOT con su error
        const primerError = errors.mapped()[`${Object.entries(errors.mapped())[0][0]}`];
        return res.render('editarBot', {
            nombreUsuario: infoUsuario.nombre,
            "primerError": primerError,
            "old": req.body,
            infoBot: req.body
        })

    },

    eliminarBot: async (req, res) => {
        // Eliminamos las relaciones que existan entre el bot y el servicio
        // Obtenemos el ID del Bot en base a la direccion IP y el hostname        
        const { hostname, ip } = req.query;
        const infoBotEliminar = await db.Bot.findAll({
            where: {
                hostname: hostname,
                direccionIP: ip
            },
            raw: true
        });
        let idBotEliminar = infoBotEliminar[0].id;

        // Eliminamos todas las relaciones entre el BOT y sus Servicios
        await db.ServicioBot.destroy({
            where: {
                id_bot: idBotEliminar
            }
        });

        // Eliminamos al bot
        await db.Bot.destroy({
            where: {
                id: idBotEliminar
            }
        });
        return res.redirect('/home');
    },

    agregarServicioBot: async (req, res) => {
        const { hostname, dirIp, token, servicio } = req.body.data;
        // Verificamos en base al TOKEN

        // Encontramos el id del bot, con base al host y la IP
        let botBusqueda = await db.Bot.findAll({
            where: {
                direccionIP: dirIp,
                hostname: hostname
            },
            raw: true
        });
        let idBotBusqueda = botBusqueda[0].id;

        // Verificamos si el servicicio ya ha sido agregado al bot
        let servicioAgregado = await db.ServicioBot.findAll({
            where: {
                id_bot: idBotBusqueda,
                nombre: servicio
            }
        });

        // Si el arreglo es mayor a 0, quiere decir que el servicio ya existe dentro del bot
        if (servicioAgregado.length > 0) {
            return res.send({
                "res": false,
                "msg": "El servicio ya se encuentra registrado a la DB"
            })
        }

        // Si no, lo agregamos
        await db.ServicioBot.create({
            nombre: servicio,
            id_bot: idBotBusqueda,
            estado: 1
        })
        return res.send({
            "res": true,
            "msg": 'BOT agregado correctamente, recargue para ver cambios'
        });
    },

    actualizarEstadoServicio: async (req, res) => {
        const { hostname, dirIp, token, servicio } = req.body.data;
        // Támbien verificamos el token

        // Obtenemos el id del bot en base al hostname y la direccion IP
        let botBusqueda = await db.Bot.findAll({
            where: {
                direccionIP: dirIp,
                hostname: hostname
            },
            raw: true
        });
        let idBotBusqueda = botBusqueda[0].id;
        // Acualizamos el estado del servicio a true (activo)
        await db.ServicioBot.update(
            {
                estado: 0
            },
            {
                where: {
                    id_bot: idBotBusqueda,
                    nombre: servicio
                }
            }
        )

        return res.send({
            "res": true,
            "msg": 'El servicio se ha encendido correctamente'
        });

    },

    actualizarEstadoServicioApagado: async (req, res) => {
        const { hostname, dirIp, token, servicio } = req.body.data;
        // Támbien verificamos el token

        // Obtenemos el id del bot en base al hostname y la direccion IP
        let botBusqueda = await db.Bot.findAll({
            where: {
                direccionIP: dirIp,
                hostname: hostname
            },
            raw: true
        });
        let idBotBusqueda = botBusqueda[0].id;
        // Acualizamos el estado del servicio a true (activo)
        await db.ServicioBot.update(
            {
                estado: 1
            },
            {
                where: {
                    id_bot: idBotBusqueda,
                    nombre: servicio
                }
            }
        )

        return res.send({
            "res": true,
            "msg": 'El servicio se ha apagado correctamente'
        });
    },

    test: async (req, res) => {
        let nombreBot = "Bot-LF236";
        let host = "odin_user";
        const infoBot = await db.Bot.findAll({
            where: {
                nombreBot: nombreBot,
                hostname: host
            },

            limit: 1,
            include: [
                {
                    association: "servicios"
                }
            ]
        });
        res.send(infoBot);
    }
};

module.exports = mainControllers;