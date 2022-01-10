const { body, check } = require('express-validator');
const validarDirIP = (ipaddress) => {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return true;
    }
    return false;
}


const validarActualizarBot = [
    check('nombreBot')
        .notEmpty().withMessage('El campo del nombre del bot no debe estar vacio').bail()
        .isLength({ min: 3 }).withMessage('El nombre del bot debe ser más largo'),
    check('hostname')
        .notEmpty().withMessage('El campo del host no debe estar vacio').bail()
        .isLength({ min: 3 }).withMessage('El host debe ser mas largo'),
    check('password')
        .notEmpty().withMessage('El campo de la contraseña no debe estar vacio').bail()
        .isLength({ min: 5 }).withMessage('La contraseña debe ser más larga'),
    check('direccionIP')
        .notEmpty().withMessage('El campo de la dirección IP no debe estar vacio').bail()
        .custom((value, { req }) => validarDirIP(req.body.direccionIP)).withMessage('El formato de la dirección IP es incorrecto')

];

module.exports = validarActualizarBot;