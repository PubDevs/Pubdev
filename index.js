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
	  console.log(JSON.stringify(req.body));
	  res.json(validarInformacion());// retorna true o false donde significa registrado o correo existente
});

app.get('/evento', (req, res) => {
	//eventos
	res.sendFile('generic.html', {root: path.join(__dirname, './public/')});
});

app.get('/salondefama', (req, res) => {
	//
	res.sendFile('salonFama.html', {root: path.join(__dirname, './public/')});
});

function validarInformacion(nombre, correo, sobreNombre, contrasena1, contrasena2, BackEnd, FrontEnd){
	if(nombre !== "" && validarEmail(correo) && sobreNombre !== "" &&  validarContrasena(contrasena1, contrasena2) && BackEnd !== "Back-end" && FrontEnd !== "Front-End"){
		if(validarCorreo(correo)){
			var data = {
				nombre: nombre,
				correo: correo,
				sobreNombre: sobreNombre,
				contrasena: sha1(contrasena1),
				BackEnd: BackEnd,
				FrontEnd: FrontEnd
			};
			db.ref("Usuarios/"+sha1(correo)).set(data);
			return true;
		}else{
			return false;
		}
	}else{
		return false;	
	}
}

function validarCorreo(correo){
	db.ref("Usuarios/"+sha1(correo)).on("value", function(data){
		db.ref("Usuarios/"+sha1(correo)).off();
		data = data.val();
		if(data== null){
			//retorno true para saver que esta disponible el correo
			return true;
		}else{
			//retorno true para saver que esta no disponible el correo
			return false;
		}
	});
}

function validarContrasena(pass1, pass2){
	if(pass1 !== "" && pass1 !== "" && (pass1 === pass2)){
		return true;
	}else{
		return false;
	}
}

function validarEmail(email){
  var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}