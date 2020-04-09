const admin = require('firebase-admin');

var serviceAccount = require("../../pubdev-968b9-firebase-adminsdk-i9atd-d4e7d40b63.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pubdev-968b9.firebaseio.com/"
  });
  var db = admin.database();

exports.renderIndexPage = (req, res) => {
    res.render("../../views/index")
}
exports.renderEventosPage = (req, res) => {
    res.render("../../views/eventos")
}
exports.renderRegistroPage = (req, res) => {
    res.render("../../views/registro")
}
exports.renderEventoPage = (req, res) => {
    res.render("../../views/generic")
}
exports.renderSalondefamaPage = (req, res) => {
    res.render("../../views/salonFama")
}
exports.registrarUsuario = (req, res) => {
    console.log(JSON.stringify(req.body.correo))
    //res.json(validarInformacion())
    console.log("entro a la ruta")
    res.json("hola");
}
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