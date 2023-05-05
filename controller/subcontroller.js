const product = require('../model/shoesmodel');
const productsub = require('../model/submodel');


module.exports.addsubshoes = async(req,res) =>{
    let shoesdata = await product.find(req.body);
    return res.render('addsubshoes',{
        'csdata' : shoesdata
    });

 
}

module.exports.insertsubproduct = async(req,res) =>{
    req.body.isactive = 'true';
    let shoesdata = await productsub.create(req.body);
    return res.redirect('back');
}

module.exports.viewsubshoes = async(req,res) =>{
    // let shoesdata = await productsub.find(req.body).populate('subprid').exec();
    // return res.render('viewsubshoes',{
    //     subdata : shoesdata
    // })

    let active = await productsub.find({'isactive' : true}).populate('subprid').exec();
    let deactive = await productsub.find({'isactive' : false}).populate('subprid').exec();
    return res.render('viewsubshoes',{
        isactivedata : active,
        deactivedata : deactive
    }); 
}

module.exports.deactive = async(req,res) =>{
    let data = await productsub.findByIdAndUpdate(req.params.id,{
        isactive : 'false'
    });
    return res.redirect('back');
}

module.exports.active = async(req,res) =>{
    let data = await productsub.findByIdAndUpdate(req.params.id,{
        isactive : 'true'
    });
    return res.redirect('back');
}

// module.exports.deleteshoes = async(req,res) =>{
//     let productdata = await productsub.findByIdAndDelete(req.params.id);
//     return res.redirect('back');
// }