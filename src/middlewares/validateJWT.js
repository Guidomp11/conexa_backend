require("dotenv").config();

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({msg: 'No hay token'});
    }

    try{
        const encryption = jwt.verify(token, process.env.JWT);
        req.user = encryption.user;
        next();
    }catch(e){
        return res.status(401).json({msg: 'Token invalido'});
    }
}