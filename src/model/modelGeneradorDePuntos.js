const sha1 = require('sha1');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage({
	keyFilename: "../pubdev-968b9-firebase-adminsdk-i9atd-d4e7d40b63.json",
	 projectId: "pubdev-968b9"
  });
//const bucket = storage.bucket("gs://pubdev-968b9.appspot.com/");
//configuracion para acceder a la this.db de firebase

const modeloGeneradorDePuntos = function (datos, db){
	this.db=db.firestore()
	this.datos = datos
}
modeloGeneradorDePuntos.prototype.GuardarCodigo = function(){
    return new Promise(async resolver => {
        if(await consultarexistencia(this.db,this.datos.codigo)){
            guardarcodigoDb(this.db,this.datos);
            resolver(true)
        }else{
            resolver(false)
        }
    })
}

modeloGeneradorDePuntos.prototype.bucarCodigos = function(){
    return new Promise(async resolver => {
        resolver(await bucarcodigosDB(this.db))
    })
}

modeloGeneradorDePuntos.prototype.cambiarestadodelcodigo = function(){
    return new Promise(async resolver => {
        resolver(await cambiarestadodelcodigoDb(this.db, this.datos))
    })
}

modeloGeneradorDePuntos.prototype.cargarPuntosdb = function(){
    return new Promise (async resolver =>{
        var resultado = await verificarestadodelcodigo(this.db,this.datos.codigo)
        if(resultado == true){
            if(await validarCollectionenpuntosrepetidos(this.db,this.datos.codigo,this.datos.correo)){
                if(await canjearCodigo(this.db, this.datos)){
                    resolver({estado: true})
                }else{
                    resolver({estado : "No Estas Registrado"})
                }
            }else{
                resolver({estado : "Ya Tienes Codigo"})
            }
        }else if(resultado == false){
            resolver({estado: "Codigo Expirado"})
        }else if(resultado == "No Existe"){
            resolver({estado : "No Existe"})
        }
    })
}

function canjearCodigo(db,datos){
    return new Promise (resolver => {
        db.doc("Cuentas/"+sha1(datos.correo)).get()
        .then(snapshot =>{
            if(snapshot.data() == undefined){
                //vacio
                resolver(false)
            }else{
               sumarPuntosaluser(db,snapshot.data(),datos)
               registrarPuntosEnCollectionHistorial(db,datos)
               resolver(true)
            }
        })
    })
}
function registrarPuntosEnCollectionHistorial(db,datosPost){
    var uid= datosPost.correo +"-"+datosPost.codigo
    datosPost.condicional=datosPost.correo+"/"+datosPost.codigo
    db.doc("HistorialDePuntosDeCodigos/"+sha1(uid)).set(datosPost)
}
function sumarPuntosaluser(db,datauser,datapost){
    db.doc("codigo/"+datapost.codigo).get()
    .then(snapshot => {
        var puntos = parseInt(((snapshot.data()).puntos)) + parseInt(datauser.puntos)
        db.doc("Cuentas/"+sha1(datapost.correo)).update({puntos: puntos})
    })
    .catch(error => {
        console.log("mensaje del erorr: "+ error)
    })
}
function validarCollectionenpuntosrepetidos(db, codigo,correo){
    return new Promise (resolver => {
        db.collection("HistorialDePuntosDeCodigos").where("condicional","==",correo+"/"+codigo).get()
        .then(snapshot => {
            if(snapshot.empty){
                //busqueda vacia
                resolver(true)
            }else{
                resolver(false)
            }
        })
        .catch(error => {
            console.log('Error getting documents', error)
        })
    })
}
function verificarestadodelcodigo(db,codigo){
    return new Promise(resolver => {
        db.doc("codigo/"+codigo).get().then(documentSnapshot => {
            if (documentSnapshot.exists){
                resolver((documentSnapshot.data()).estado)
            }else{
                resolver("No Existe")
            }
          });
    })
}
function cambiarestadodelcodigoDb(db,datos){
    return new Promise (resolver => {
        db.doc('codigo/'+datos.codigo).update({estado: datos.estado}).then(res => {
            resolver(true)
        })
        .catch(error =>{
            resolver(false)
        });
    })
}

async function bucarcodigosDB(db){
    return new Promise(async resolver => {
    var datos = {};
    datos = {
        true: await bucarcodigosDBestado(db, true),
        false: await bucarcodigosDBestado(db, false)
    }
    resolver(datos)
    })
}

function bucarcodigosDBestado(db, estado){
    return new Promise(resolver => {
        db.collection('codigo').where('estado', '==', estado).get()
        .then(snapshot => {
            if (snapshot.empty){
              //la busqueda se encuentra basia
              resolver(false)
            }
            //------ hay datos -------
            var json = []
            snapshot.forEach(doc => {
              //console.log(doc.id, '=>', doc.data())
              json.push(doc.data())
            });
            resolver(json);
          })
          .catch(err => {
            console.log('Error getting documents', err)
          });
    })
}

function guardarcodigoDb(db,datos){
    db.collection("codigo").doc(datos.codigo).set(datos)
}
function consultarexistencia(db,codigo){
    return new Promise (resolver => {
        db.collection('codigo').where('codigo', '==', codigo).get()
        .then(snapshot => {
            if (snapshot.empty){
              //la busqueda se encuentra basia
              resolver(true)
            }
            resolver(false)
          })
          .catch(err => {
            console.log('Error getting documents', err)
          });
    })
}
module.exports = modeloGeneradorDePuntos
