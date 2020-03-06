const express = require('express');
const path = require('path');
const app = express();
//app.use(express.static('public'));

//la aplicacion correra por el puerto 3000 
app.listen(3000, ()=>{
	console.log('servidor encendidoo');
	console.log(__dirname);
});
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/assets', express.static(__dirname + '/public/assets'));

app.get('/', function(req, res){
  res.sendFile('index.html', {root: path.join(__dirname, './public/')});
}); 
app.get('/eventos', (req, res) => {
	//eventos
	res.sendFile('eventos.html', {root: path.join(__dirname, './public/')});
});
app.get('/registro', (req, res) => {
	//eventos
	res.sendFile('Registro.html', {root: path.join(__dirname, './public/')});
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