const bcrypt = require('bcrypt');
const User = require('../models/User');


const encryptPass = async ($pass)=>{
   let salt = await bcrypt.genSalt(10);
   try {
      return await bcrypt.hash($pass, salt);
   } catch (error) {
      console.error(error)
   }
};

const decryptPass = async ($pass, storedPass)=>{

   return await bcrypt.compare($pass, storedPass);
};


module.exports = {encryptPass, decryptPass};