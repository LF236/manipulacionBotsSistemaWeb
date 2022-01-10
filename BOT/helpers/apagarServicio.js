const { exec } = require("child_process");

const apagarServicio = servicio => {
    return new Promise((resolve, reject) => {
        exec(`systemctl stop ${servicio}`, (error, stdout, stderr) => {
            if (error) {
                resolve(true);
            }
            if (stderr) {
                resolve(true);
            }
            resolve(true);
        });
    })
}

module.exports = apagarServicio;