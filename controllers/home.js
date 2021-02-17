// imports
const User = require('../models/User');
const {encryptPass, decryptPass} = require('../utils/hashPass');
const passport = require('passport');


exports.renderHome = (req, res, next) => {
   if (req.cookies.session) {
      return res.redirect('/guias');
   }
   // global.ç_sockets.emit('server-message', { 'foo':'bar' })
   console.log('home render');

   res.status(200).render('home', {
      docTitle: 'sockets / inicio',
      breadcrumbs: '/inicio',
      SERVER_URL: `${req.protocol}://${req.get('host')}`,
   });
}; // renderHome

exports.login = async (req, res, next) => {
   console.log('home login:');
   const {email, password, remember} = req.body;
   
   
      passport.authenticate('local', {
         successRedirect: '/guias',
         failureRedirect: '/',
         failureFlash: true,
         failureMessage: 'Fail'
      })(req, res, next);
}; // login

exports.crearUser = async (req, res, next) => {
   const new_user = new User(req.body);
   const hashedPAss = await encryptPass(req.body.password);
   new_user.password = hashedPAss;

   try {
      await new_user.save()
      res.status(201).json(new_user);
   } catch (err) {
      console.log(err);
      console.log(err instanceof EvalError); // true
      console.log(err.message);              // "Hello"
      console.log(err.name);                 // "EvalError"
      console.log(err.fileName);             // "someFile.js"
      console.log(err.lineNumber);           // 10
      console.log(err.columnNumber);         // 0
      console.log(err.stack);                // "@Scratchpad/2:2:9\n"
      res.status(500).json({success: false, errMsg: err.message});
   }
   
} // crearUser end...


////////////////////////////////////////////////////////////////////////////////
exports.logout = async (req, res, next) => {

   req.logout();
   req.flash('success_msg', 'Cerraste sesión');
   res.redirect('/');

   // fecha actual
   // const now = new Date()
   // // options
   // const options = {
   //    expires: now,
   //    httpOnly: true,
   //    // secure: true
   // };
   // res.status(200).cookie('session', 'null', options).redirect('/');
};

// social_links= {
//    linkedin: 'https://www.linkedin.com/in/jean-belmont-dantes/',
//    github: 'https://github.com/jeanbelmont',
//    fiverr: 'https://www.fiverr.com/jeanbelmont'
// }