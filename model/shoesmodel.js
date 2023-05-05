const mongosse = require('mongoose');

const path = require('path');

const multer = require("multer");

const imagepath = "/upload/shoes";

const prschema = mongosse.Schema ({
    name :{
        type : String ,
        require : true
    },
    image :{
        type : String ,
        require : true
    },
    price :{
        type : String ,
        require : true
    },
    isactive : {
        type : Boolean
    }
}) 

const storage = multer.diskStorage({
    destination :function (req,file,cb){
        cb(null,path.join(__dirname,'..',imagepath));
    },
    filename : function(req,file,cb)
    {
        cb(null,file.fieldname +"-"+ Date.now());
    }
})

prschema.statics.uploadimage = multer({storage : storage}).single('image');
prschema.statics.imagepath = imagepath;

const product = mongosse.model('product',prschema);
module.exports = product;