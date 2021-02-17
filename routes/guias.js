// express
const protect = require('../middleware/protectRoutes');
const express = require('express');
// Router
const router = express.Router();

// DeStructuring home controller
const {
   viewGuia,
   crearGuia,
   historial
} = require('../controllers/guias')


// routes
router.route('/')
   .get(protect, viewGuia)
   .post(protect, crearGuia);

//
router.route('/historial')
   .get(protect, historial)
   .post(protect, historial);

// export
module.exports = router;
