const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const tokenGenerator = require('uuid-token-generator');
const db = require('../database/models');

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

        console.log(botsInfo);
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

        return res.render('infoBot', {
            nombreUsuario: infoUsuario.nombre
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

    agregarBot: (req, res) => {
        console.log(req.body);
        let errors = validationResult(req);
        // Verificamos si no hay errores en express-validator
        if (errors.isEmpty()) {
            // Si no los hay, registramos el BOT en la DB

            // Redireccionamos a la vista con la información del BOT
            return res.redirect(`/infoBot/${req.name}`);
        }
        // Si hay errores, renderizamos la vista del formualario de agregar BOT con su error
        const primerError = errors.mapped()[`${Object.entries(errors.mapped())[0][0]}`];
        return res.render('agregarBot', {
            nombreUsuario: "hehe",
            "primerError": primerError,
            "old": req.body
        })
    },

    test: async (req, res) => {
        res.render('error');
    }
};

module.exports = mainControllers;