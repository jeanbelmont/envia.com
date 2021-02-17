// imports
exports.renderSockets = async (req, res, next)=>{
   // console.log(req.headers['user-agent']);
   // console.log(req.cookies);
   console.log('sockets', req.user);

   const ejsParams = {
      docTitle: 'Numeros de Guía',
      breadcrumbs: '/inicio',
      user: req.user,
      SERVER_URL: `${req.protocol}://${req.get('host')}`,
   }
   if (req.originalUrl.endsWith('/')) {
      return res.status(301).location(`${req.baseUrl}`).render('sockets', ejsParams);
   }
   res.status(200).render('sockets', ejsParams);
};