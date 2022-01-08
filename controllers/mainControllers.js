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
        res.render('login', {
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
            if(data.length == 0) {
                return res.render('login', {
                    "primerError": {
                        msg: "El usuario no existe"
                    },
                    "old": req.body
                })
            }

            // Verificamos si la contraseña es la misma, si no mandar mensaje de ERROR
            if(!bcryptjs.compareSync(password, data[0].password)) {
                return res.render('login', {
                    "primerError": {
                        msg: "Contraseña Incorrecta"
                    },
                    "old": req.body
                })
            }

            // Si se cumplen todas las condiciones iniciamos sesion
            // Le asignamos un token a la sesión
            req.session.tokenSesion = new tokenGenerator().generate();
            console.log(data);
            console.log(user);
            console.log(password);
            return res.redirect('/home');
        }
        const primerError = errors.mapped()[`${Object.entries(errors.mapped())[0][0]}`];
        return res.render('login', {
            "primerError": primerError,
            "old": req.body
        })

    },

    home: (req, res) => {
        res.render('home');
    },

    infoBot: (req, res) => {
        res.render('infoBot');
    },

    test: async (req, res) => {
        res.render('error');
    }
};

module.exports = mainControllers;