const crypto = require('crypto');
///

const algorithm = 'aes-256-cbc';
const secretKey = process.env.CRYPTO_SECRET_KEY;
const iv = crypto.randomBytes(16);

const encrypt = (text, $id) => {

   const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

   const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

   return {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex'),
      _salt: $id
   };
};

const decrypt = (hash, $id, res) => {

   try {
      const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

      const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
      console.log(decrpyted.toString());
      return decrpyted.toString();
   } catch (err) {
      // fecha actual
      const now = new Date()
      // options
      const options = {
         expires: now,
         httpOnly: true,
         // secure: true
      };
      res.status(200).cookie('session', 'null', options).redirect('/');
      console.error(err);
   }
};

module.exports = {
   encrypt,
   decrypt
};