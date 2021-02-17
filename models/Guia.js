// imports
const { Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = require('../config/sqlConn');

const Guia = sequelize.define('Guia', {
   carrier: {
      type: DataTypes.STRING
   },
   
   service: {
      type: Sequelize.STRING
   },
   trackingNumber: {
      type: Sequelize.STRING(1234)
   },
   trackUrl: {
      type: Sequelize.STRING
   },
   dateMX: {
      type: Sequelize.STRING
   }
},
{
   tableName: 'guias',
   timestamps: false,
}
);

// Guia.sync().then((res) => {
//     console.log(res);
//  }).catch((err) => {
//     console.error(err);
//  })
// /////// This creates the table, dropping it first if it already existed
// Guia.sync({ force: true }).then((res) => {
//    console.log(res);
// }).catch((err) => {
//    console.error(err);
// });

//////// This checks what is the current state of the table in the database
//////// (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
// Guia.sync({ alter: true }).then((res) => {
//     console.log(res);
//  }).catch((err) => {
//     console.error(err);
//  })

/////// Synchronizing all models at once
// sequelize.sync({ force: true })

/////// Dropping tables
// Guia.drop().then((res) => {
//    console.log(res);
// }).catch((err) => {
//    console.error(err);
// });
////// Drop ALL tables
// sequelize.drop();

///// Database safety check
/////Sequelize accepts a match option as an additional safety check, which receives a RegExp:
// This will run .sync() only if database name ends with '_test'
// sequelize.sync({ force: true, match: /_test$/ });




// exports
module.exports = Guia;

// obj.carrier = x.carrier;
// obj.service = x.service;
// obj.guia = x.trackingNumber;
// obj.url = x.trackUrl;
// obj.conteo = n++;
// obj.hora = fechaStr(0, 19);

// mensajes.push(obj);