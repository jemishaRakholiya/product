const express = require('express');

const route = express.Router();

const shoes = require('../model/shoesmodel');

const controller = require('../controller/shoescontroller');

const passport = require('passport');

route.get('/addshoes', passport.checkauthentication,controller.addshoes);

route.post('/insertproduct',passport.checkauthentication, shoes.uploadimage, controller.insertproduct);

route.get('/viewshoes', passport.checkauthentication,controller.viewshoes);

route.get('/deactive/:id', passport.checkauthentication,controller.deactive);

route.get('/active/:id', passport.checkauthentication,controller.active);

route.get('/updateshoes/:id', passport.checkauthentication,controller.updateshoes);

route.post('/editproduct', passport.checkauthentication,controller.editproduct);


module.exports = route;