const express = require('express');

const route = express.Router();

const controller = require('../controller/index');

const passport = require('passport');

const addcart = require('../model/addtocart');

route.get('/', controller.frontmain);

route.get('/viewmore',controller.viewmore);

route.get('/shopnow/:id',controller.shopnow);

route.post('/addtocart', addcart.uploadimage, controller.addtocart);

route .get('/admin', passport.checkauthentication, controller.dashboard);

route.post('/sessioncreate', passport.authenticate('local', {failureRedirect : '/login'}) ,controller.sessioncreate);

route.get('/addcustomer', passport.checkauthentication, controller.addcustomer);

route.post('/insertcustomer', passport.checkauthentication, controller.insertcustomer);

route.get('/viewcustomer', passport.checkauthentication, controller.viewcustomer);

route.get('/deletecustom/:id', passport.checkauthentication, controller.deletecustom);

route.get('/updatecustom/:id', passport.checkauthentication, controller.updatecustom);

route.post('/updatecustomer', passport.checkauthentication, controller.updatecustomer);

route.get('/viewprofile/:id',passport.checkauthentication,controller.viewprofile);

// route.get('/viewuser',passport.checkauthentication,controller.viewuser);


route.get('/register', controller.register);
route.post('/addregistre', controller.addregistre);

route.get('/login', controller.login);

route.get('/logout',async(req,res,next)=> {
    req.logOut(function(err){
        if(err)
        {
            return next(err);
        }
        return res.redirect('/login');
    })
})

route.get('/changepass',passport.checkauthentication,controller.changepass);

route.post('/editpassword',passport.checkauthentication,controller.editpassword);

route.get('/forgetpass',controller.forgetpass);

route.post('/forgetpassword',controller.forgetpassword);

route.use('/product',require('./shoespr'));

route.use('/subproduct',require('./subproduct'));

route.use('/extraproduct', require('./extra'));

module.exports = route;