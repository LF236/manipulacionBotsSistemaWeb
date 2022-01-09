const { body, check } = require('express-validator');
const validarDirIP = (ipaddress) => {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return true;
    }
    return false;
}


const validarRegistroBot = [
    check('name')
        .notEmpty().withMessage('El campo del nombre del bot no debe estar vacio').bail()
        .isLength({ min: 3 }).withMessage('El nombre del bot debe ser más largo'),
    check('host')
        .notEmpty().withMessage('El campo del host no debe estar vacio').bail()
        .isLength({ min: 3 }).withMessage('El host debe ser mas largo'),
    check('password')
        .notEmpty().withMessage('El campo de la contraseña no debe estar vacio').bail()
        .isLength({ min: 5 }).withMessage('La contraseña debe ser más larga'),
    check('ip')
        .notEmpty().withMessage('El campo de la dirección IP no debe estar vacio').bail()
        .custom((value, { req }) => validarDirIP(req.body.ip)).withMessage('El formato de la dirección IP es incorrecto')

];

module.exports = validarRegistroBot;