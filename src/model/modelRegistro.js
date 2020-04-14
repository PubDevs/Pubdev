
var Firebase = require('firebase');
const sha1 = require('sha1');
//const googleStorage = require('@google-cloud/storage');
/*const storage = googleStorage({
	projectId: "pubdev-968b9",
	keyFilename: "../../pubdev-968b9-firebase-adminsdk-i9atd-d4e7d40b63.json"
  });*/
//const bucket = storage.bucket("gs://pubdev-968b9.appspot.com/");
//configuracion para acceder a la this.db de firebase

  
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

const registro = function (datos, db){
	this.db=db.database()
	this.auth = db.auth()
	this.datos = datos
	
}


registro.prototype.consultarCorreo =  async function(){
	return new Promise (resolver => {
		//console.log("hola");
		var url = "Cuentas/Usuarios/"+sha1(this.datos.correo)
			this.db.ref(url).on("value", (data)=>{
				this.db.ref(url).off()
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
	this.db.ref(url).set(this.datos)
}

registro.prototype.registrarEnFirebaseAuth = function(){
		this.auth.createUser({
			email: this.datos.correo,
			password: this.datos.contrasena1
		  })
			.then(function(userRecord) {
				// userRecord.uid     ----   es el iddelasecion
			})
			.catch(function(error) {
			});	
}

/*registro.prototype.guardarImgFireStorage = function(){
	console.log('Upload Image');
	let file = this.img;
	if (file){
		uploadImageToStorage(file).then((success) => {
		res.status(200).send({
			status: 'success'
		});
		}).catch((error) => {
		console.error(error);
		});
	}

}

const uploadImageToStorage = (file) => {
	return new Promise((resolve, reject) => {
	  if (!file) {
		reject('No image file');
	  }
	  let newFileName = `${file.originalname}_${Date.now()}`;
  
	  let fileUpload = bucket.file(newFileName);
  
	  const blobStream = fileUpload.createWriteStream({
		metadata: {
		  contentType: file.mimetype
		}
	  });
  
	  blobStream.on('error', (error) => {
		reject('Something is wrong! Unable to upload at the moment.');
	  });
  
	  blobStream.on('finish', () => {
		// The public URL can be used to directly access the file via HTTP.
		const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
		resolve(url);
	  });
  
	  blobStream.end(file.buffer);
	});
  }*/
module.exports = registro