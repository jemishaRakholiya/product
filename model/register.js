const mongoose = require('mongoose');

const extraschema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const register = mongoose.model('register', extraschema);
module.exports = register;