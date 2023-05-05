const express = require('express');

const route = express.Router();

const extraconrtolloer = require('../controller/extra');

const passport = require('passport');

route.get('/addextrashoes', passport.checkauthentication,extraconrtolloer.addextra);

route.post('/subdata', passport.checkauthentication,extraconrtolloer.subdata);

route.post('/insertextradata', passport.checkauthentication,extraconrtolloer.insertextradata);

route.get('/viewextrashoes', passport.checkauthentication,extraconrtolloer.viewextrashoes);

route.get('/deleteshoes/:id',extraconrtolloer.deleteshoes);

// route.get('/updateshoes/:id',extraconrtolloer.updateshoes);

module.exports = route;