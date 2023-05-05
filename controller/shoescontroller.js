const product = require('../model/shoesmodel');
const path = require("path");
const fs = require('fs');

module.exports.addshoes = async(req,res) =>{
    return res.render('addshoes')
}

module.exports.insertproduct = async(req,res) =>{
    // console.log(req.body);
    // console.log(req.file);
    var imagepath =' ';
    if(req.file){
        var imagepath = product.imagepath+"/"+req.file.filename;
    }
    req.body.image = imagepath;
    req.body.isactive = 'true';
    let productdata = await product.create(req.body);
    if(productdata){
        console.log("Data is inserted");
        return res.redirect('back');
    }
    else
    {
        console.log("record is Not insert");
    }
}

module.exports.viewshoes = async(req,res) =>{
    // let productdata = await product.find(req.body);
    // return res.render('viewshoes',{
    //     prdata : productdata
    // }); 

    let active = await product.find({'isactive' : true});
    let deactive = await product.find({'isactive' : false});
    // return res.render('viewshoes',{
    //     isactivedata : active,
    //     deactivedata : deactive
    // }); 
    let search = '';
    if(req.query.search){
        search = req.query.search;
    }

    let page = 2;
    if(req.query.page){
        page = req.query.page
    }
    // console.log(req.query.page);
    var p_page = 5;

    let admindata = await product.find({
        $or : [
            {name : {$regex : '.'+search+'.'}}
            // {email : {$regex : '.'+search+'.'}}
        ]
    })
    .skip((page -1) * p_page)
    .limit(p_page)
    .exec();

    let countdata = await product.find({
        $or : [
            {name : {$regex : '.'+search+'.'}},
            // {email : {$regex : '.'+search+'.'}}
        ]
    }).countDocuments();

    return res.render('viewshoes',{
        'isactivedata' : active,
        'deactivedata' : deactive,
        'countrecored' : Math.ceil(countdata/p_page),
        'searchrecored' : search
    })
}

module.exports.deactive = async(req,res) =>{
    let data = await product.findByIdAndUpdate(req.params.id,{
        isactive : 'false'
    });
    return res.redirect('back');
}

module.exports.active = async(req,res) =>{
    let data = await product.findByIdAndUpdate(req.params.id,{
        isactive : 'true'
    });
    return res.redirect('back');
}

// module.exports.deleteshoes = async(req,res) =>{
//     let productdata = await product.findByIdAndDelete(req.params.id);
//     return res.redirect('back');
// }

module.exports.updateshoes = async(req,res) =>{
    let productdata = await product.findById(req.params.id);
    return res.render('updateshoes',{
        'updatepr' : productdata
    })
}

module.exports.editproduct = async(req,res) =>{
    let customerdata = await product.findById(req.body.editpr);
    if(customerdata)
    {
        let editcus = await product.findByIdAndUpdate(req.body.editpr,req.body);
        if(editcus){
            return res.redirect('viewshoes');
        }
        else{
            return res.redirect('back');
        }
    }
    return res.redirect('back');
}

