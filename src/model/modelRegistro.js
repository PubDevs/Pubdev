var Firebase = require('firebase');
const admin = require('firebase-admin');
const sha1 = require('sha1');
//configuracion para acceder a la db de firebase
var serviceAccount = require("../../pubdev-968b9-firebase-adminsdk-i9atd-d4e7d40b63.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pubdev-968b9.firebaseio.com/"
  });
  var db = admin.database();
  
  var config = {
    apiKey: "AIzaSyAkAne3jmc5QVjIWCDVd0nGMDevlKLuhig",
    authDomain: "pubdev-968b9.firebaseapp.com",
    databaseURL: "https://pubdev-968b9.firebaseio.com",
    projectId: "pubdev-968b9",
    storageBucket: "pubdev-968b9.appspot.com",
    messagingSenderId: "873812772334",
    appId: "1:873812772334:web:6ad03ca3af78f457627aff",
    measurementId: "G-KXBQE6HPF5"
}
  Firebase.initializeApp(config);

const registro = function (datos){
	this.datos = datos
	this.estado = false
}
registro.prototype.consultarCorreo =  async function(){
	return new Promise (resolver => {
		var url = "Cuentas/Usuarios/"+sha1(this.datos.correo)
			db.ref(url).on("value", function(data){
			db.ref(url).off()
		resolver({datos: data.val()})
		})
	})
}

registro.prototype.ajustarJquey = function(){
	this.datos.contrasena = sha1(this.datos.contrasena1)
	this.datos.contrasena1 = null
	this.datos.contrasena2 = null
}

registro.prototype.crearUsuario = function(){
	var url = "Cuentas/Usuarios/"+sha1(this.datos.correo)
	db.ref(url).set(this.datos)
}

registro.prototype.registrarEnFirebaseAuth = function(){
		admin.auth().createUser({
			email: this.datos.correo,
			password: this.datos.contrasena1
		  })
			.then(function(userRecord) {
				// userRecord.uid     ----   es el iddelasecion
			})
			.catch(function(error) {
			});	
}

module.exports = registro