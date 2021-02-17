// express Router
const router = require('express').Router();

// DeStructuring controller
const { contacto, render404 } = require('../controllers/404');

// routes
// router.route('/').get(render404);

router.route('/')
.get(render404)
.post(render404)
.put(render404)
.patch(render404)
.delete(render404);


router.route('/contacto').post(contacto);
// export
module.exports = router;
