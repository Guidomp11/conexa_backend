require('dotenv').config();

const mongoose = require('mongoose');

module.exports = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }catch(error){
        process.exit(1);
    }
}