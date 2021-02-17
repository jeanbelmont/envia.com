// express
const express = require('express');
// passport
const passport = require('passport');

// DeStructuring home controller
const {
   renderHome,
   login,
   logout,
   crearUser
} = require('../controllers/home')

// Router
const router = express.Router();

// routes
router.route('/').get(renderHome).post(login);

router.route('/crearUser').post(crearUser);

router.route('/logout').get(logout);

// export
module.exports = router;
