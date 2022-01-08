require('colors');
const generarDB = () => {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                console.log('Generando base de datos'.rainbow);
                // require('../database/models/Usuario').sequelize.sync({ force: true });
                // require('../database/models/Servicio').sequelize.sync({ force: true });
                // require('../database/models/Bot').sequelize.sync({ force: true });
                
                require('../database/models').sequelize.sync({ alter: true });
                resolve(true);
            }, 2000)
        }
        catch(err) {
            reject(false);
        }
    })
}

generarDB()
    .then(resultado => {
        if(resultado) {
            console.log('Todo esta bien'.blue);
        }
        else {
            console.log('Salio mal'.red);
        }
    })