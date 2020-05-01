var Firebase = require('firebase');
const sha1 = require('sha1');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage({
	keyFilename: "../pubdev-968b9-firebase-adminsdk-i9atd-d4e7d40b63.json",
	 projectId: "pubdev-968b9"
  });

const ModeloUsuarioAdmin = function (datos, db){ 
    this.db=db.firestore()
    this.datos = datos
    this.auth=db.auth()
    
}
ModeloUsuarioAdmin.prototype.logearAdm =  async function(){
    
    return new Promise(resolver => {
        console.log("enta dentro") 
        console.log(this.datos)
        this.db.collection("Cuentas").where('correo', '==', this.datos.correo).get()
        .then(snapshot => {
			if (snapshot.empty){
                //No existe el administrador
                console.log("Linea 24 modelo basio")
                this.datos.imgEvento = ""
                resolver("false")
            }else{
                //existe el usuario
                console.log("Linea 30 existe user")
                var json = []
                snapshot.forEach(doc => {
                //console.log(doc.id, '=>', doc.data())
                json.push(doc.data())
                });
                console.log(json)
                if(json[0].tipo == "administrador"){
                    console.log("administrador")
                    /*this.auth.signInWithEmailAndPassword(this.datos.correo, this.datos.clave).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode);
                        console.log(errorMessage);
                        // ...
                        resolver("false")
                      });
                      resolver("true")*/
                }else{
                    console.log("no adm")
                    resolver("false")
                }
            }
        }).catch(err => {
                console.log('Error getting documents', err);
                resolver("false")
                });
    })
}
module.exports = ModeloUsuarioAdmin