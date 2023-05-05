const mongoos = require('mongoose');

const customerschema = mongoos.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    }
});

const customer = mongoos.model('customer',customerschema);
module.exports = customer;