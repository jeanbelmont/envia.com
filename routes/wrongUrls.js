// express Router
const router = require('express').Router();


const redirect = async (req, res, next) => {
   res.redirect('/404');
}

router.route('/')
.get(redirect)
.post(redirect)
.put(redirect)
.patch(redirect)
.delete(redirect);



// export
module.exports = router;
