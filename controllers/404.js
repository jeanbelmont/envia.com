
exports.render404 = async (req, res, next) => {

   const ejsParams = {
      docTitle: '404 | not found',
      link: '/404',
      user: '',
   }

   if (req.originalUrl.endsWith('/')) {
      return res.status(301).location(`${req.baseUrl}`).render('404', ejsParams);
   }
   
   return res.status(404).location('/404').render('404', ejsParams);
} // render404



//@ forma contacto
// GET (/404/contacto)
// Public
exports.contacto = async (req, res, next) => {
   console.log(req.body);
      
   const json = JSON.parse(Buffer.from(req.body.info, 'base64').toString('utf-8'));
   console.log(json);

   res.json(json);
};