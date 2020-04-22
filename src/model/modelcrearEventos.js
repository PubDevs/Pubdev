var Firebase = require('firebase');
const sha1 = require('sha1');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage({
	keyFilename: "../pubdev-968b9-firebase-adminsdk-i9atd-d4e7d40b63.json",
	 projectId: "pubdev-968b9"
  });

const ModeloCrearEventos = function (datos, db){ 
    this.db=db.firestore()
    this.datos = datos
    
}

ModeloCrearEventos.prototype.crearEvento= function(){
    return new Promise (resolver =>{
        this.db.collection("ProximosEventos").where('nombre', '==', this.datos.nombre).get()
        .then(snapshot => {
			if (snapshot.empty){
                //esta bacio lo cual creamos el evento
                this.datos.imgEvento = ""
                this.db.collection("ProximosEventos").doc(sha1(this.datos.nombre)).set(this.datos)
                resolver(true)
            }else{
                //tienes datos
                resolver(false)
            }
        }).catch(err => {
                console.log('Error getting documents', err);
                resolver(false)
                });
        });
}

ModeloCrearEventos.prototype.guardarImgFireStorage = function(file,newName){
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
		this.db.collection("ProximosEventos").doc(sha1(this.datos.nombre)).update({imgEvento: url})
		resolve(url);
	  });
	  blobStream.end(file.buffer);
	}else{
		reject('No image file');
	}
});
}



module.exports = ModeloCrearEventos