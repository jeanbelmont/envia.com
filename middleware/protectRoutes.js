const { decrypt } = require('./crypto');
const User = require('../models/User');
const passport = require('passport');

function protect (req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   };
   req.flash('error', 'Debes iniciar sesión')
   res.redirect('/');
}

// function protect(req, res, next) {
//    if (Object.is(req.cookies.session, undefined)) {

//       return res.redirect('/');

//       // return res.status(401).location('/')
//       //    .render('home', {
//       //       docTitle: 'sockets / inicio',
//       //       breadcrumbs: '/inicio',
//       //       SERVER_URL: `${req.protocol}://${req.get('host')}`,
//       //       success: false,
//       //       error: 'Debes iniciar sesión'
//       //    })
   
//    } //

//    const sessionCookie = Buffer.from(req.cookies.session, 'base64').toString('utf-8');
//    // tO DO; buscar usuario en DB
//    console.log('protectRoutes', sessionCookie);
//    const userID = decrypt(JSON.parse(sessionCookie), '253', res);
//    req.user = userID;
//    return next();
// }
module.exports = protect;



// function protect(req,res, next, ){
//       passport.authenticate('local', {
//       successRedirect: 'http://google.com',
//       failureRedirect: 'http://duckduckgo.com',
//    });

// }
// module.exports = protect;
