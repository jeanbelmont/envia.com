// imports
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' }); // ruta al archivo .env
// sql
const sql = require('./config/sqlConn');
sql.authenticate()
.then(() => { console.log('mysql conectada.'); })
.catch(err =>{ console.error('Unable to connect to the database:', err);} );
// mongo
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, { 
   useNewUrlParser: true,
   useUnifiedTopology: true, 
 })
 .then(() => { console.log('mongo conected')})
 .catch(err =>{ console.log('Unable to connect mongo '+ err)})
const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');
const cookie = require('cookie-parser');
const cors = require('cors');
const hpp = require('hpp');
const rate_limit = require('express-rate-limit');
const expressSession = require('express-session');
const flash = require('connect-flash');
// passport
const passport = require('passport');
require('./utils/passPort')(passport);
///
const http = require('http');
const socketio = require('socket.io');
// const protectRoutes = require('./middleware/protectRoutes');
// express
const express = require('express');
const app = express();
// como se usa io y express en el mismo event loop en lugar de hacer el server directamente con express se hace con el core module "http" y se le pasa la "app" de express
const server = http.createServer(app);

// socket.io
const io = socketio(server); // paso el server con http y express

// io.on connection crea un nuevo socket por cada cliente que se conecta
io.on('connection', (socket) => {   
   // console.log('Socket :' + socket.id);
   socket.userID = socket.handshake.query.userID;
   // console.log('userID', socket.userID);
   // cada socket dispara un evento especial al desconectarse: disconnect
   socket.on('disconnect', () => {
      // console.log('socket disconnect :' + socket.id);
   });

   // .on es como un listener que espera un "evento" en este caso mis eventos se llaman client-message || server-message
   socket.on('client-message', (msg) => { // la variable msg es un OBJ que viene del front-end
      // console.log(msg);
      io.emit('server-message', {msg}); // socket.broadcast emite el msg del socket que envia a todos los demas sockets
      // io.emit('server-message', msg); // io.emit emite el msg a todos los sockets incluyendo al mismo que lo envío
   });
});

//// middlewares 
// templating engine
app.set('view engine', 'ejs');
// Body parser
app.use(express.json());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({
   extended: true
}));
// Enable CORS
app.use(cors());
//cookie parser
app.use(cookie());
// security headers
// app.use(helmet());
// prevent http param pollution
app.use(hpp());
// Prevent XSS atack
app.use(xss())
// express rate limiter
const limit = rate_limit({
   windowMs: 10 * 60 * 1000,
   max: 20000
});
app.use(limit);

// express-session
app.use(expressSession({
   secret: 'sdvne5BE$Se4ggse$HE$%fwagGAW',
   resave: true,
   saveUninitialized:true,
}   
));
// passport middleware
app.use(passport.initialize());
app.use(passport.session());
//flash messages
app.use(flash());
// Global VARS
app.use((req, res, next) => {
   global.ç_sockets = io;
   res.locals.ç_sockets = io;
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
   next();
});


//// Routes 
// users 
app.use('/', require('./routes/home'));
// guias
app.use('/guias', require('./routes/guias'));
app.use('/guias/historial', require('./routes/guias'));
// homeremoveSlash, 
app.use('/sockets', require('./routes/socket'));
// 404, 
app.use('/404', require('./routes/404'));




// static folder se pone despues de los Routes
app.use(express.static(path.join(__dirname, 'public')));

/*Handling wrong urls*/
app.use('/*', require('./routes/wrongUrls'));


/////////////// test

// run server
server.listen(process.env.SOCKET_PORT, () => console.log('node server running')); //
