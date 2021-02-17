// imports
const axios = require('axios');
const fechaStr = require('../utils/fechaStr');
const sql = require('../config/sqlConn');
const Guia = require('../models/Guia');

// @ Render View Guias
// GET /guias
// Private
exports.viewGuia = async (req, res, next) => {
   console.log('guias',req.user)
   const ejsParams = {
      docTitle: 'Nueva Guía',
      breadcrumbs: '/nueva-guia',
      SERVER_URL: `${req.protocol}://${req.get('host')}`,
      user: req.user,
      data: '',
   };
   if (req.originalUrl.endsWith('/')) {
      return res.status(301).location(`${req.baseUrl}`).render('guias', ejsParams);
   }
   res.status(200).render('guias', ejsParams);
}; // viewGuia


// @Crear Guias
// POST /guias
// Private
exports.crearGuia = async (req, res, next) => {  
   let N = 0;
   const last = await Guia.findAll({ limit: 1, order: [['id', 'DESC']] });
   N = last[0].id;

   var config = {
      method: 'post',
      url: process.env.URL_ENVIA+'/ship/generate/',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${process.env.API_ENVIA}`,
      },
      data: req.body
   };

   axios(config)
      .then(function (response) {
         const parse = response.data;

         let obj = {};
         let mensajes = [];
         async function sQL(obj) {

         try {
            // await Promise.reject(new Error('Oops!'));
            await Guia.create(obj);
            
         } catch (err) {
            console.error(err.message);   // "Oops!"
         }
       
         };
         
         parse.data.forEach((x, i, a) => {
            console.log('index:', i, 'arr:', a.length -1);
            let { carrier, service, trackingNumber, trackUrl} = x;
            obj = {
               carrier,
               service,
               trackingNumber,
               trackUrl,
               dateMX: fechaStr(0, 19).replace('T', ' '),
               conteo: N++
            }
            mensajes.push(obj)
            sQL(obj);
            // console.log('mensajes',mensajes);
            console.log(JSON.stringify('msg json',mensajes));
            if (i == a.length-1) {
               res.status(200).json({mensajes});
            }
         });
         // console.log(mensajes);
      })
      .catch(function (error) {
         console.log(error);
         res.status(500).json(error);
      }).finally((mensajes)=>{
         res.status(200).json(mensajes);
      });


}; // crearGuia


//@name:      Historial
//@route:     GET /guias/historial
//@access:    Public 
exports.historial = async (req, res, next) => {
   // console.log(req.body, req.query);
   console.log('historial', req.user);
   // el query regresa un obj con 2 keys: count y rows 
   // asi que hago DeStructuring
   const { count } = await Guia.findAndCountAll({
      limit: 0,
      offset: 0
   });
   // paginacion // DeStructuring del body
   let {per_page, order} = req.body;
   let page = req.query.page;
   console.error(page);
   console.warn(req.body);
   //
   let limit = parseInt(per_page) || 9;
   if(limit > 48) limit = 48;
   if(limit < 1) limit = 1;
   //
   let total_pages = Math.ceil((count / limit));
   //
   page = parseInt(page)|| 1;
   if (page < 1 ) page = 1;
   if (page > total_pages) page = total_pages;
   //
   let offset = (page-1) * limit;
   //
   if (order !== 'ASC') {
      console.log('invalid order fallback to DESC');
      order = 'DESC';
   }
   ////////////////////////////////////// query
   let Query = {
      order: [
         ['id', order],
      ],
      limit,
      offset
   };

   // exec query
   const { rows } = await Guia.findAndCountAll(Query);
   
   const ejs = {
      docTitle: 'Historial Guias',
      path: '/guias/historial',
      SERVER_URL: `${req.protocol}://${req.get('host')}`,
      user: req.user,
      page,
      per_page,
      total_pages,
      order,
      data: rows
   };

   res.status(200).location(`/historial/?page=${page}&per_page=${per_page}&order=${order}`).render('historial', ejs);
   
   // res.json({
   //    success: true,
   //    total: guias.count,
   //    page: page,
   //    per_page: limit,
   //    total_pages,
   //    order,
   //    data: guias.rows,
      
   // });

} // historial end...

