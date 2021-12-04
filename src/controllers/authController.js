const db = require('../database/models');
const bcryptjs = require('bcryptjs');
const sanitize = require('../functions/db_sanitize');
const generateJWT = require('../functions/generateJWT');
const validateRequest = require('../functions/validateRequest');

module.exports = {
    signup: async (req, res) => {
        try{
            validateRequest(req, (errors) =>  { throw {status: 400, errors} });
            
            const { email, password, username } = sanitize(req.body);

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

        }catch(e){
            const { status, errors } = e;

            return res.status(status || 400).json({errors} || {});
        }
    },
    signin: async (req, res) => {
        try{
            validateRequest(req, (errors) =>  { throw {status: 400, errors} });

            const { email, password } = sanitize(req.body);

            const user = await db.User.findOne({email});

            if(!user) throw {status: 400, errors: 'Credenciales Invalidas'}

            if(!bcryptjs.compareSync(password, user.password)) throw {status: 400, errors: 'Credenciales Invalidas'}

            generateJWT({
                user: {
                    id: user.id
                }
            }, 
                (token) => res.status(200).json({response: {token, user}}),
                ({status, errors}) => res.status(status || 400).json({response: {errors} || {}})
            );
            
        }catch(e){
            const { status, errors } = e;
            
            return res.status(status || 400).json({errors} || {});
        }
    },
    authenticate: async (req, res) => {
        try{
            const user = await db.User.findById(req.user.id).select('-password');

            if(!user) throw {status: 400, errors: 'Fallo autenticacion'}

            return res.status(200).json({response: user});

        }catch(e){
            const { status, errors } = e;

            return res.status(status || 400).json({errors} || {});
        }
    }
}