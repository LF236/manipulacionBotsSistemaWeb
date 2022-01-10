let exec = require('child_process').exec;
const execute = (command, callback) => {
    exec(command, function (error, stdout, stderr) { callback(stdout); });
};

const buscarComando = (comando) => {
    return new Promise((resolve, reject) => {
        execute(`systemctl list-unit-files --type service --all | cut -d " " -f1 | egrep ${comando}`, (salida) => {
            salida = salida.trim();
            let aux = salida.split('\n');
            let band = false;
            //console.log(aux);
            for(let comandoAux of aux) {
                comandoAux = comandoAux.replace('.service', '');
                if(comandoAux == comando) {
                    band = true;
                    break;
                }
            }
            if(band) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        })
    })

}

// buscarComando('mysqld')
//     .then(res => {
//         console.log(res)
//     })
module.exports = buscarComando;