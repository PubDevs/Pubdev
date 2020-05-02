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
ModeloUsuarioAdmin.prototype.logearAdm = function(req,res){
    return new Promise(resolver => {
        console.log("enta dentro") 
        console.log(this.datos)
        const auth = this.auth
        this.db.collection("Cuentas").where('correo', '==', this.datos.correo).get()
        .then(snapshot => {
			if (snapshot.empty){
                res.send("Administrador no logeado")
            }else{
                //existe el usuario
                console.log("Linea 30 existe user")
                let administrador = {}
                snapshot.forEach(doc => {
                //console.log(doc.id, '=>', doc.data())
                administrador=doc.data()
                });
                console.log(administrador)
                if(administrador.tipo == "administrador"){
                    console.log("administrador")
                    this.auth.signInWithEmailAndPassword(this.datos.correo,this.datos.clave).then(response=>{
                        req.session.user=administrador
                        res.redirect("/sudo")
                    })
                    .catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode === 'auth/wrong-password') {
                          console.log('Wrong password.');
                          res.send("usuario no identificado")
                        } else {
                          console.log(errorMessage);
                          res.send("ususario no identificado");
                        }
                        res.send("usuario no identificado")
                    });
                    
                }else{
                    console.log("no adm")
                    res.send("no eres administrador");
                }
            }
        }).catch(err => {
                console.log('Error getting documents', err);
                resolver("false")
                res.send("no aparecez como usuario")
                });
    })
}
module.exports = ModeloUsuarioAdmin