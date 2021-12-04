require("dotenv").config();

const jwt = require('jsonwebtoken');

const generateJWT = (payload, onSuccess, onError) => {
    jwt.sign(payload, process.env.JWT, {
        expiresIn: '30d'
    }, (error, token) => {
        if(error){
            onError({status: 400, errors: 'Error en JWT'});
        }
        onSuccess(token);
    });
    
}

module.exports = generateJWT;