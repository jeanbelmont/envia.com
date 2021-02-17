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
const toast = ç('.toast');


// toast
let pop = new bootstrap.Toast(toast, {
   animation: true,
   autohide: true,
   delay: 4500
});
function notificacion(data){
   ç('.toast_date').innerText = data.dateMX;
   ç('.toast_content').innerText = data.trackingNumber;
   ç('.toast_number').innerText = data.conteo;
   pop.show();
};


// ON message FROM server  socket.on('stringID')
socket.on('server-message', (data) => {
   notificacion(data.msg);
})

// submit form 
var loader = new bootstrap.Modal(document.getElementById('ModalLoader'), {
   keyboard: false,
   backdrop: 'static',
})
form.addEventListener('submit', function (e) {
   e.preventDefault();
   enviarGuia(input.value);
});

function enviarGuia(json) {
   var myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");
   // myHeaders.append("Cookie", "session=" + sessionStorage.getItem('ssn'));

   var raw = json;

   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
   };

   fetch(window.location.origin+"/guias", requestOptions)
      .then(response => response.json())
      .then(result => {
         result.mensajes.forEach((i, ï, ä)=>{
            socket.emit('client-message', i);
         });
         loader.hide();
      })
      .catch(error => {
         console.log('error', error)
         // alert('error');
         loader.hide();
      })
      .finally(() => {
         loader.hide();
      });
}


//// instrucciones
window.addEventListener('load', ()=>{
   var myModalEl = document.getElementById('exampleModal');
   var myModal = new bootstrap.Modal(myModalEl, { backdrop: 'static', focus: true, keyboard: false });

   const firstTime = localStorage.getItem('firstTime');
   if (firstTime === null) {
      localStorage.setItem('firstTime', 'yes')
      myModal.show()
   } else {
      localStorage.setItem('firstTime', 'no');
   }
});