// fecha toma dos parametros INT para el slice // donde empieza el corte del string y donde termina
function fechaStr(start, end) {
   const utc = new Date();
   const toLocal = new Date(utc.setDate(utc.getHours() - 6));

   // if (Object.is(hours, undefined)) {
   //    hours = +0;
   // }

   if ((Object.is(start, undefined) || Object.is(end, undefined))) {
      return toLocal.toISOString();
   }
   return toLocal.toISOString().slice(start, end);
};

// un parametro INT  regresa cuantos dias mas +  partir de la fecha de hoy
const masDias = ($dias)=>{
   const utc = new Date();
   const toLocal = new Date(utc.setDate(utc.getDate() + $dias));

   if ((Object.is($dias, undefined))) {
      return toLocal.toISOString();
   }
   return toLocal.toISOString();
};

// un parametro INT  regresa cuantos dias menos -  a partir de la fecha de hoy
const menosDias = ($dias)=>{
   const utc = new Date();
   const toLocal = new Date(utc.setDate(utc.getDate() - $dias));

   if ((Object.is($dias, undefined))) {
      return toLocal.toISOString();
   }
   return toLocal.toISOString();
};

// un parametro INT  regresa cuantos minutos mas + a partir de ahora
const masMinutos = ($mins)=>{
   const utc = new Date();
   const toLocal = new Date(utc.setMinutes(utc.getMinutes() + $mins));

   if ((Object.is($mins, undefined))) {
      return toLocal.toISOString();
   }
   return toLocal.toISOString();
};

module.exports = { fechaStr, masDias, menosDias, masMinutos };