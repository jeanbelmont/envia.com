const Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.SQL_LOCAL,
{
   // dialectOptions: {
   //    useUTC: false, //for reading from database
   //    dateStrings: true,
   //    typeCast: true
   // },
   timezone: '-06:00' //for writing to database
}
);
