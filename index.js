const express = require('express');
const path = require('path');
const app = express();
const admin = require('firebase-admin');

var serviceAccount = require("./pubdev-968b9-firebase-adminsdk-i9atd-d4e7d40b63.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pubdev-968b9.firebaseio.com/"
});
var db = admin.database();

//la aplicacion correra por el puerto 3000 
app.listen(7777, ()=>{
	console.log('servidor encendidoo abre --> http://localhost:7777');
	console.log(__dirname);
});
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/assets', express.static(__dirname + '/public/assets'));

app.get('/', (req, res)=>{
  res.sendFile('index.html', {root: path.join(__dirname, './public/')});
  db.ref("Usuarios/1075307011").on("value", (datos)=>{
  	console.log(datos.val());
  })
}); 
app.get('/eventos', (req, res) => {
	//eventos
	res.sendFile('eventos.html', {root: path.join(__dirname, './public/')});
});
app.get('/registro', (req, res) => {
	//eventos
	res.sendFile('registro.html', {root: path.join(__dirname, './public/')});
});
app.post('/registro/form', (req, res, next) => {
	//eventos
	console.log(req.body);
  	res.json({hola: hola});
});

app.get('/evento', (req, res) => {
	//eventos
	res.sendFile('generic.html', {root: path.join(__dirname, './public/')});
});

app.get('/salondefama', (req, res) => {
	//
	res.sendFile('salonFama.html', {root: path.join(__dirname, './public/')});
});
/*
app.get('/evento/:codeEvento', (req, res) => {
	//eventos
});
app.post('/registrarUsuario', (req, res) => {
	//eventos
});
app.post('/CrearEvento', (req, res) => {
	//eventos
});*/
