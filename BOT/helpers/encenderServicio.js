const { exec } = require("child_process");

const encenderServicio = servicio => {
    return new Promise((resolve, reject) => {
        exec(`systemctl start ${servicio}`, (error, stdout, stderr) => {
            if (error) {
                resolve(false);
            }
            if (stderr) {
                resolve(false);
            }
            resolve(true);
        });
    })
}

module.exports = encenderServicio;