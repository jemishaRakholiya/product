const mongosse = require('mongoose');

const prsubschema = mongosse.Schema ({
    subprid :{
        type : mongosse.Schema.Types.ObjectId,
        ref : "product",
        require : true
    },
    addsubp : {
        type : String,
        required : true
    },
    isactive : {
        type : Boolean
    }
}) 

const productsub = mongosse.model('subproduct',prsubschema);
module.exports = productsub;