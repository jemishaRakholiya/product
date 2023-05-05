const express = require('express');

const route = express.Router();

const controller = require('../controller/subcontroller');

const passport = require('passport');

route.get('/addsubshoes', passport.checkauthentication,controller.addsubshoes);

route.post('/insertsubproduct', passport.checkauthentication,controller.insertsubproduct);

route.get('/viewsubshoes', passport.checkauthentication,controller.viewsubshoes);

route.get('/deactive/:id', passport.checkauthentication,controller.deactive);

route.get('/active/:id', passport.checkauthentication,controller.active);

module.exports = route;