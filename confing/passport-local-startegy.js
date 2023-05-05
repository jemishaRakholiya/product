const passport = require('passport');

const passportlocal = require('passport-local').Strategy;

const register = require('../model/register');

console.log('passport is running');

passport.use(new passportlocal({
    usernameField : 'email'
}, async (email,password,done)=> {
    let admindata = await register.findOne({email : email})
    if(admindata.password == password){
        return done(null,admindata);
    }
    else{
        console.log('Invaliad Details');
        return done(null,false);
    }
}))

passport.serializeUser((user,done) => {
    return done(null,user.id);
})

passport.deserializeUser(async (id,done) => {
    let admindata = await register.findById(id);
    if(admindata){
        return done(null,admindata);
    }
    else{
        console.log('Data Not Match !!');
        return done(null,err);
    }
})

passport.checkauthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.render('login');
}

passport.setAuthenticationuser = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;