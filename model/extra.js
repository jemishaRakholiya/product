const mongosse = require('mongoose');

const prextrachema = mongosse.Schema ({
    subprid :{
        type : mongosse.Schema.Types.ObjectId,
        ref : "product",
        require : true
    },
    subexpr :{
        type : mongosse.Schema.Types.ObjectId,
        ref : "subproduct",
        require : true
    },
    addsubp : {
        type : String,
        required : true
    }
}) 

const extrapr = mongosse.model('extrapr',prextrachema);
module.exports = extrapr;