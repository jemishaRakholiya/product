const mongoos = require('mongoose');

const path = require('path');

const multer = require("multer");

const addpath = "/upload/shoes";

const addcartschema = mongoos.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    }
});

const storage = multer.diskStorage({
    destination :function (req,file,cb){
        cb(null,path.join(__dirname,'..',addpath));
    },
    filename : function(req,file,cb)
    {
        cb(null,file.fieldname +"-"+ Date.now());
    }
})

addcartschema.statics.uploadimage = multer({storage : storage}).single('image');
addcartschema.statics.addpath = addpath;

const addcart = mongoos.model('addcart',addcartschema);
module.exports = addcart;