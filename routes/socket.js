// express
const protect = require('../middleware/protectRoutes');
const express = require('express');
// DeStructuring home controller
const { renderSockets } = require('../controllers/socket')

// Router
const router = express.Router();


// routes
router.route('/').get(protect, renderSockets);

// export
   module.exports = router;

