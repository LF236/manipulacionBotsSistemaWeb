const mainControllers = {
    index: (req, res) => {
        console.log(req);
        res.send('Hola');
    },

    home: (req, res) => {
        res.render('home');
    },

    infoBot: (req, res) => {
        res.render('infoBot');
    }
};

module.exports = mainControllers;