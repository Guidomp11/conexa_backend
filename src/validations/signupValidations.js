const { check } = require('express-validator');

module.exports = [
    check('email')
        .not().isEmpty().withMessage('Campo E-mail vacio')
        .isEmail().withMessage('El E-mail debe ser valido'),
    check('password')
        .not().isEmpty().withMessage('Insertar contraseña valida')
]