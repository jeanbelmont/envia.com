// esversion 2018
function random() {
   return Math.ceil(Math.random() * 1000000);
}
// const socket = io('http://localhost:3000', { transport: ['websocket'] });
// const socket = io();
const socket = io(window.location.origin, {
   reconnectionDelayMax: 10000,
   auth: {
      token: "token"
   },
   query: {
      userID: random()
   },
   // autoConnect: false,
});

/// selectores
const form = ç('#send-container');
const input = ç('#message-input');
const msgContainer = ç('#message-container');
const btn = ç('#send-btn');
const main = ç('main');

// crea un nuevo globo de chat
let booleanNegate = true;
function notificacion(data) {
   let oddEvenClass = '';
   if (booleanNegate === true) {
      oddEvenClass = 'alert-success';
   } else {
      oddEvenClass = 'alert-warning';
   }
   // para ahcer mas facil el manejo creamos una variavle que contenga el elemento que vamos a crear en este caso un div
   let notificacion = document.createElement('article');
   // una vez creado podemos manipularlo como cualquier elemento ya existente en el DOM
   // es decir, podemos agregar o quitar atributos como classes IDs href style cualquier cosa
   notificacion.classList.add(oddEvenClass);
   notificacion.innerHTML = `
   <div class="alert ç{oddEvenClass}" role="alert">
      <a id="guia" href="${data.trackUrl}" target="_blank">Guia# ${data.trackingNumber}</a>
   <span id="mensaje">
   <span id="contador">contador: ${data.conteo}</span>
   <span id="carrier">${data.carrier} - ${data.service}</span>
   <span id="hora">fecha: ${data.dateMX}</span>
   </span>
   </div>
   `;
   msgContainer.prepend(notificacion);
   // Javascript boolean Negate
   booleanNegate = !booleanNegate;
}

// ON message FROM server  socket.on('stringID')
socket.on('server-message', (data) => {
   // console.log(data);
   notificacion(data.msg);
});
