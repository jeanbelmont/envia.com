const site_url = (str, bool) => {
   Object.is(bool, true) ? bool = window.location.href : bool = window.location.origin;
   if (typeof str !== 'string') str = '';
   return bool + str;
}
const ç = _ => { let º = document.querySelectorAll(_); return º.length > 1 ? º : º[0] };
ç('.ssn').id !== '' ? sessionStorage.setItem('ssn', ç('.ssn').id) : '';
///////////////////////// selectores
const forma_contacto = ç('#forma_contacto');
const email_from = ç('#email_from');
const email_subject = ç('#email_subject');
const email_content = ç('#email_content');
const _id = ç('#_id');
const send_email = ç('#send_email');
const mail_falso = ç('#mail_falso');
const select_modal = document.getElementById('modal_contacto');
const contact_modal = new bootstrap.Modal(select_modal, {
   backdrop: 'static', focus: true, keyboard: false
});


//////////////// valid mail
email_from.addEventListener('blur', async function () {
   
   var myHeaders = new Headers();
   var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
   };
   const checkMail = await fetch(`https://disposable.debounce.io/?email=${email_from.value}`, requestOptions);
   
   let result = await checkMail.json();
   
   if (result.disposable !== 'true') {
      send_email.classList.remove('disabled');
      mail_falso.classList.add('invisible')
   }
   if (result.disposable !== 'false' || Object.is(result.disposable,undefined) ) {
       send_email.classList.add('disabled')
      mail_falso.classList.remove('invisible');
    }
 
});
email_from.addEventListener('change', ()=>{ 
   if (email_from.value === '') {
      send_email.classList.add('disabled')
   }
});
/////////////////////////////////


function enviar_mail(){
   // enviar mail
   const info = {
      _id: _id.value,
      email: email_from.value,
      subject: email_subject.value,
      content: email_content.value,
   }
   let json = JSON.stringify(info);
   let btoa = window.btoa(json);

   ///////// Fetch
   var myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

   var urlencoded = new URLSearchParams();
   urlencoded.append("info", btoa);

   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
   };

   fetch(site_url() + "/404/contacto", requestOptions)
      .then(res => res.json())
      .then(parsed => {
         console.log(parsed);
         contact_modal.hide();
      })
      .catch(err => {
         console.log('err', err)
         contact_modal.hide();
      });
   ///////// Fetch
}

////////////////// check empty
forma_contacto.addEventListener('submit', function(e){
   e.preventDefault();
   let n = 0;
   let checkArr = [email_from, email_subject, email_content];
   checkArr.forEach((i, ï, ä, ev)=>{
      if (i.value === '') {
         i.style.border = 'solid red'
         setTimeout(()=>{i.style.border = ''}, 1800);
      } else {n++}
      if (n === ä.length) {
         enviar_mail();
      }
   });

}); // send_email end
'window loaded  😅'


// // /////////// fetch historial
// var requestOptions = {
//    method: 'GET',
//    redirect: 'follow'
// };

// fetch("http://localhost:3000/guias/historial", requestOptions)
//    .then(response => response.text())
//    .then(result => console.log(result))
//    .catch(error => console.log('error', error));