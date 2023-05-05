const product = require('../model/shoesmodel');
const sub = require('../model/submodel');
const extrapr = require('../model/extra');

module.exports.addextra = async (req,res) => {
    // console.log(req.body);
    let extradata = await product.find(req.body);
    return res.render('addextra',{
        adex : extradata
    })
}

module.exports.subdata = async (req,res) => {
    let extradata = await sub.find({'subprid' : req.body.mainid});
    return res.render('subdata',{
        subid : extradata
    })
}

module.exports.insertextradata  = async (req,res) => {
    // console.log(req.body);
    let extradata = await extrapr.create(req.body);
    return res.redirect('back');
}

module.exports.viewextrashoes = async (req,res) => {
    let extradata = await extrapr.find({}).populate('subprid').populate('subexpr').exec();
    return res.render('viewextra',{
        viewdata : extradata
    })
}

module.exports.deleteshoes = async(req,res) =>{
    let productdata = await extrapr.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

