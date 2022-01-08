const db = require('../database/models');

const mainControllers = {
    index: (req, res) => {
        console.log(req);
        res.send('Hola');
    },

    showLogin: (req, res) => {
        res.render('login');
    },

    processLogin: async (req, res) => {
        const { user, password } = req.body;
        
        // Buscamos la información del usuario en base al campo user
        const data = await db.Usuario.findAll({
            where: {
                usuario: user
            },
            raw: true
        });
        console.log(data);
        console.log(user);
        console.log(password);
        res.send('Hola');
    },

    home: (req, res) => {
        res.render('home');
    },

    infoBot: (req, res) => {
        res.render('infoBot');
    },

    test: async (req, res) => {
        const data = await db.Usuario.findAll({
            raw: true
        })
        res.send(data);
    }
};

module.exports = mainControllers;