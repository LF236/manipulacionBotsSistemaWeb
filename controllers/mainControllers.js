const db = require('../database/models');

const mainControllers = {
    index: (req, res) => {
        console.log(req);
        res.send('Hola');
    },

    showLogin: (req, res) => {
        res.render('login');
    },

    processLogin: (req, res) => {
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