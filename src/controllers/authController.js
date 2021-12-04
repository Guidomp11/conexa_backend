const db = require('../database/models');
const bcryptjs = require('bcryptjs');
const generateJWT = require('../functions/generateJWT');
const validateRequest = require('../functions/validateRequest');

module.exports = {
    signup: async (req, res) => {
        validateRequest(req, (errors) =>  { throw {status: 400, errors} });
            
            const { email, password, username } = req.body;

            const emailInUse = await db.User.findOne({email}) ? true : false;

            if(emailInUse) throw {status: 400, errors: 'E-mail en uso'}
            
            const salt = await bcryptjs.genSalt(10);
            const newUser = new db.User({
                username,
                email,
                password: bcryptjs.hashSync(password, salt)
            });
            
            await newUser.save();

            const user = newUser;
            user.password = null;
            
            generateJWT({
                user: {
                    id: newUser.id
                }
            }, 
                (token) => res.status(200).json({response: {token, user}}),
                ({status, errors}) => res.status(status || 400).json({response: {errors} || {}})
            );
    },
    signin: async (req, res) => {
        
    },
    authenticate: async (req, res) => {
        
    }
}