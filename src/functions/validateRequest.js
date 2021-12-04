const { validationResult } = require('express-validator');

const validateRequest = (req, cb) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        cb(errors);
    }
}

module.exports = validateRequest;