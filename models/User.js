// imports
const mongoose = require('mongoose');
const { masDias, masMinutos } = require('../utils/fechaStr');

const UserSchema = new mongoose.Schema({
   nombre: {
      type: String, required: true
   },
   login: {
      type: String, required: true
   },
   email: {
      type: String, required: true
   },
   password: {
      type: String, required: true, select: false
   },
   social_links: {
      facebook: String,
      linkedin: String,
      github: String,
      fiverr: String,
      twitter: String,
   },
   resetPass:{type:String, default:undefined},
   deleteAt: { type: Date, default: new Date(masMinutos(3))},
   _date:{
      type: Date, default: Date.now
   },

});
// indexes
UserSchema.index({
   email: 1,
}, {
   unique: true,
});

UserSchema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 });


// x4otgRTAsXy93sxNoa85qjnmfbNP290e
const User = mongoose.model('User', UserSchema);
module.exports = User;



/////////////////////////////////////////////////////

// const { Sequelize, DataTypes, Model } = require('sequelize');
// const sequelize = require('../config/sqlConn');

// class User extends Model { }

// User.init({
//    // Model attributes are defined here
//    name: {
//       type: DataTypes.STRING,
//       // allowNull defaults to true
//    },
//    email: {
//       type: DataTypes.STRING,
//       allowNull: false
//    },
//    password: {
//       type: DataTypes.STRING,
//       allowNull: false
//    },
//    token: {
//       type: DataTypes.UUID,
//       defaultValue: Sequelize.UUIDV4
//    },
//    id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: Sequelize.UUIDV1
//    },

// }, {
//    // Other model options go here
//    sequelize, // We need to pass the connection instance
//    modelName: 'User', // We need to choose the model name
//    tableName: 'users'
// });

// the defined model is the class itself
// console.error(User === sequelize.models.User); // true


// User.sync().then((res) => {
//     console.log(res);
//  }).catch((err) => {
//     console.error(err);
//  })



///////////////////////////////////////////////////////////////////////////////////

// // encripta passwords
// const bcrypt = require('bcrypt');

// class User{
//    constructor() {
//       this.email = "jean";
//       this.password = "$2b$10$ua4R5JxdbmsxvN.mdzHArucrjS3AKUO4zyO6DpQT/KYP/HAouhP5S";
//    }
//    static async encryptPass(pass){
//       const salt = await bcrypt.genSalt(10);
//       return bcrypt.hash(pass, salt);
//    }
//    static async decryptPass(pass, storedPass){
//       return await bcrypt.compare(pass, storedPass);
//    }
// }

// module.exports = User;

// const users = [
//    {
//       email: "admin@gmail.com",
//       password: "123",
//    },
//    {
//       email: "jjco@gmail.com",
//       password: "456",
//    }
// ];