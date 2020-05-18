var Firebase = require('firebase');
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