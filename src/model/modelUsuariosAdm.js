var Firebase = require('firebase');
const sha1 = require('sha1');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage({
	keyFilename: "../pubdev-968b9-firebase-adminsdk-i9atd-d4e7d40b63.json",
	 projectId: "pubdev-968b9"
  });

const ModeloUsuarioAdmin = function (datos, db, firebaseCliente){ 
    this.db=db.firestore()
    this.datos = datos
    this.auth=firebaseCliente.auth()
    
}
ModeloUsuarioAdmin.prototype.logearAdm = function(){
    return new Promise(resolver => {
        console.log("enta dentro") 
        console.log(this.datos)
        const auth = this.auth
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
                    this.auth.signInWithEmailAndPassword(this.datos.correo,this.datos.clave)
                    .catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode === 'auth/wrong-password') {
                          console.log('Wrong password.');
                        } else {
                          console.log(errorMessage);
                        }
                        console.log(error);
                    });
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