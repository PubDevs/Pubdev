const sha1 = require('sha1');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage({
	keyFilename: "../pubdev-968b9-firebase-adminsdk-i9atd-d4e7d40b63.json",
	 projectId: "pubdev-968b9"
  });
//const bucket = storage.bucket("gs://pubdev-968b9.appspot.com/");
//configuracion para acceder a la this.db de firebase

const registro = function (datos, db){
	this.db=db.firestore()
	this.auth = db.auth()
	this.datos = datos
}
registro.prototype.crearUsuarionew = function(){
	return new Promise (resolver => {
		const db = this.db
		const datos = this.datos
		datos.correo = datos.correo.toLowerCase()
		datos.puntos = 0
		//console.log("entro a la funcion")
		const url = "Cuentas"

		let citiesRef = db.collection(url);
		let query = citiesRef.where('correo', '==', datos.correo).get()
		.then(snapshot => {
			if (snapshot.empty) {
				// crear usuario
					this.auth.createUser({
					email: this.datos.correo,
					password: this.datos.contrasena1
				  })
					.then(function(userRecord) {
						//gg 
						// registro en firestore
						delete datos.contrasena1
						delete datos.contrasena2
						datos.tipo = "usuario"
						datos.imgperfil = ""
						db.collection(url).doc(sha1(datos.correo)).set(datos)
						resolver (true)
					})
					.catch(function(error) {
						//console.log(error)
						resolver(false)
					});		
				//fin de crear usuario				
			}else{
				resolver(false)
			}
			
			})
			.catch(err => {
			resolver(false)
			//console.log('Error getting documents', err);
			});
		})
}
registro.prototype.guardarImgFireStorage = function(file,newName){
	return new Promise((resolve, reject) => {
	if (file){
		let newFileName = newName;
		const bucket=storage.bucket("pubdev-968b9.appspot.com");
		let fileUpload = bucket.file(newFileName);
  
	  const blobStream = fileUpload.createWriteStream({
		metadata: {
		  contentType: file.mimetype
		}
	  });
  
	  blobStream.on('error', (error) => {
		//console.log(error);
	  });
  
	  blobStream.on('finish', () => {
		// The public URL can be used to directly access the file via HTTP.
		const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
		bucket.file(newFileName).makePublic()
		//console.log(url)
		this.db.collection("Cuentas").doc(sha1(this.datos.correo)).update({imgperfil: url})
		
		resolve(url);
	  });
	  blobStream.end(file.buffer);
	}else{
		reject('No image file');
	}
});
}
module.exports = registro
