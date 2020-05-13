const ModelRegistro = require("../model/modelRegistro");
const sha1 = require('sha1');

var controllerRegistro={
	db:null
};
controllerRegistro.guardarDb = (db)=>{
	this.db=db
}
controllerRegistro.renderRegistroPage = (req, res) => {
    res.render("../../views/registro")
}
controllerRegistro.registrarUsuario = async (req, res) => {
	if(validarInformacion((req.file).originalname,req.body.nombre,req.body.correo,req.body.sobreNombre,req.body.contrasena1,req.body.contrasena2,req.body.BackEnd,req.body.FrontEnd)){
		const newModeloRegistro = new ModelRegistro(req.body,this.db)
		var datos = await newModeloRegistro.crearUsuarionew()
		if(datos){
			newModeloRegistro.guardarImgFireStorage(req.file, "perfil/"+sha1(req.body.correo)+".png")
		}
		//res.json(true)
		res.redirect("/salondefama")
	}else{
		//res.json(false)
		res.redirect("/registro")
	}
}


function validarInformacion(originalname,nombre, correo, sobreNombre, contrasena1, contrasena2, BackEnd, FrontEnd){
	return (validarImg(originalname) && nombre !== "" && validarEmail(correo) && sobreNombre !== "" &&  validarContrasena(contrasena1, contrasena2) && BackEnd !== "Back-end" && FrontEnd !== "Front-End") ? true : false;
	
}
function validarImg(nombre){
	var nombre = nombre.toLowerCase();
	/*for(var i=0; i<nombre.length;i++){
		console.log()
	}*/
	var allowedExtensions = /(.jpg|.jpeg|.png)$/i;
    if(allowedExtensions.exec(nombre)){
		return true
	}else{
		return false
	}
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



module.exports=controllerRegistro