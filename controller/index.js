const customer = require('../model/customer');
const register = require('../model/register');
const product = require('../model/shoesmodel');
const addcart = require('../model/addtocart');
const nodemailer = require('nodemailer');

module.exports.sessioncreate = async (req,res) =>{
    return res.render('shoes');
}

module.exports.dashboard = async (req,res) =>{
    return res.render('shoes');
}

module.exports.addcustomer = async(req,res) =>{
    return res.render('addcustomer');
}

module.exports.insertcustomer = async(req,res) =>{
    // console.log(req.body);
    let customerdata = await customer.create(req.body);
    return res.redirect('back');
}

module.exports.viewcustomer = async(req,res) =>{
    // let customerdata = await customer.find(req.body);
    // return res.render('viewcustomer',{
    //     custdata : customerdata
    // });

    let search = '';
    if(req.query.search){
        search = req.query.search;
    }

    let page = 1;
    if(req.query.page){
        page = req.query.page
    }
    // console.log(req.query.page);
    var p_page = 2;

    let admindata = await customer.find({
        $or : [
            {name : {$regex : '.'+search+'.'}},
            {email : {$regex : '.'+search+'.'}}
        ]
    })
    .skip((page -1) * p_page)
    .limit(p_page)
    .exec();

    let countdata = await customer.find({
        $or : [
            {name : {$regex : '.'+search+'.'}},
            {email : {$regex : '.'+search+'.'}}
        ]
    }).countDocuments();

    return res.render('viewcustomer',{
        'custdata' : admindata,
        'countrecored' : Math.ceil(countdata/p_page),
        'searchrecored' : search
    })
}


module.exports.deletecustom = async(req,res) =>{
    let customerdata = await customer.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

module.exports.updatecustom = async(req,res) =>{
    let customerdata = await customer.findById(req.params.id);
    return res.render('updatecustom',{
        'updatedata' : customerdata
    });
}

module.exports.updatecustomer = async(req,res) =>{
    // console.log(req.body);
    let customerdata = await customer.findById(req.body.editcustom);
    if(customerdata)
    {
        let editcus = await customer.findByIdAndUpdate(req.body.editcustom,req.body);
        if(editcus){
            return res.redirect('/viewcustomer');
        }
        else{
            return res.redirect('back');
        }
    }
    return res.redirect('back');
}

module.exports.register = async (req,res) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.render('registre');
}

module.exports.addregistre = async (req,res) => {
    console.log(req.body);
    let admindata = await register.findOne({email : req.body.email});
    if(admindata){
        console.log('Invalaid detials');
        return res.redirect('back');
    }
    else{
        if(req.body.password == req.body.cpassword){
            let addata = await register.create({
                email : req.body.email,
                password : req.body.password
            })
            return res.redirect('/login');
        }
        else{
            console.log('Password Is Not Match !!');
            return res.redirect('back');
        }
    }
}

module.exports.login = async (req,res) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.render('login');
}

module.exports.viewprofile = async(req,res) =>{
    let userdata = await customer.findById(req.params.id);
    return res.render('viewprofile',{
        userdata : userdata
    })
}

// module.exports.viewuser = async(req,res) =>{
//     let userdata = await customer.findById(req.params.id);
//     return res.render('viewprofile',{
//         userdata : userdata
//     });  
// }

module.exports.changepass = async(req,res) =>{
    return res.render('changepass')
}

module.exports.editpassword = async(req,res)=>{
    var oldpass = req.user.password;
    var opass = req.body.opass;
    var npass = req.body.npass;
    var copass = req.body.copass;
    if(oldpass == opass)
    {
        if(opass != npass)
        {
            if(npass == copass)
            {
                let userpass =await register.findByIdAndUpdate(req.user.id, {password : npass})
                return res.redirect('/logout');
            }
            else
            {
                console.log("New & Confirm Are Not Match !!");
                return res.redirect('back');
            }
        }
        else
        {
            console.log("Old & New Are Not Match !!");
            return res.redirect('back');
        }
    }
    else
    {
        console.log("Old pass Match !!");
        return res.redirect('back');
    }
}


module.exports.forgetpass = async(req,res)=>{
    return res.render('forgetpass');
}

module.exports.forgetpassword = async(req,res) =>{
    let forgetpassword = await register.findOne({email : req.body.email});
    if(forgetpassword)
    {
        var otp = Math.ceil(Math.random()*10000);
        let transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "337b4b735f0f29",
                pass: "549efdf365f35b"
              }
          });

          let info = transport.sendMail({
            from: 'rakholiyajemisha13@gmail.com', // sender address
            to: forgetpassword.email, // list of receivers
            subject: "Testing", // Subject line
            text: "First line", // plain text body
            html: `<b>Here this OTP : ${otp}</b>`, // html body
          });
    }
}

module.exports.frontmain = async(req,res)=>{
    let data = await product.find(req.body);
    return res.render('frontmain',{
        'frontdata' : data
    });
}

module.exports.viewmore= async(req,res) =>{
    let data = await product.find(req.body);
    return res.render('viewmore',{
        data : data
    });
}

module.exports.shopnow = async(req,res) =>{
    let data = await product.findById(req.params.id);
    return res.render('shopnow',{
        data : data
    });
}

module.exports.addtocart = async(req,res) =>{
    // console.log(req.body);
    let adddata = await addcart.create(req.body);
   return res.redirect('/')
}