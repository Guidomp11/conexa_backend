require('dotenv').config();

const cors = require('cors');
const environment = process.env.NODE_ENV;
const availablepaths = ['https://conexa-frontend.netlify.app'];


module.exports = () => cors({
    origin: function (origin, callback) {
        
        if(environment === 'development') return callback(null, true);
        console.log(availablepaths)
        if(availablepaths.indexOf(origin) === -1){
            console.log('ERROR')
            const error = 'The CORS policy for this site does not allow access from the specified Origin.';
            throw {status: 403, error};
        }

        return callback(null, true);
    }
})