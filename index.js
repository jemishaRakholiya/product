const { urlencoded } = require('body-parser');
const express = require('express');

const port = 8080;

const app = express();

const path = require('path');

const db = require('./confing/mongoos');
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./confing/passport-local-startegy');


app.use(express.urlencoded());
app.use('/upload',express.static(path.join(__dirname+'/upload')));

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('assets'));

app.use(session({
    name : 'jemisha',
    secret : 'me',
    resave : true,
    saveUninitialized : false,
    cookie : {
        maxAge : 60*100*1000
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticationuser);

app.use('/',require('./routes/index'));

app.listen(port, (err) =>{
    if(err)
    {
        console.log("THis Port is Running Sucessfuly");
    }
    console.log("This port is not Running",port);
})