const sanitize = require('mongo-sanitize');

module.exports = (body) => {
    const bodySanitize = {};

    for(let item in body){
        const sanitizeItem = sanitize(body[item]);
        bodySanitize[item] = sanitizeItem;
    }

    return bodySanitize;
}