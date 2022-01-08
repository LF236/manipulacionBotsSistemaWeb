const { body, check } = require('express-validator');

const validarLogin = [
    check('user')
        .notEmpty().withMessage('El campo de usuario no debe estar vacio').bail()
        .isLength({ min: 2 }).withMessage('El nombre de usuario debe ser más largo'),
    check('password')
        .notEmpty().withMessage('El campo de la contraseña no debe estar vacio').bail()
];

module.exports = {
    validarLogin
}