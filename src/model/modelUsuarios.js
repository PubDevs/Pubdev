
const ModeloUsuarios = function (db){ 
    this.db=db.firestore()
}
ModeloUsuarios.prototype.consultarUsuarios = async function(){
    return new Promise (resolver => {
        this.db.collection('Cuentas').where('tipo', '==', 'usuario').get()
        .then(snapshot => {
            if (snapshot.empty){
              console.log('No matching documents.');
              return;
            }
            var json = []
            snapshot.forEach(doc => {
              //console.log(doc.id, '=>', doc.data())
              json.push(doc.data())
            });
            resolver(json);
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
    })
}


ModeloUsuarios.prototype.consultarUsuarios = async function(){
  return new Promise (resolver => {
      this.db.collection('Cuentas').where('tipo', '==', 'usuario').orderBy("puntos","desc").limit(15).get()
      .then(snapshot => {
          if (snapshot.empty){
            console.log('No matching documents.');
            return;
          }
          var json = []
          snapshot.forEach(doc => {
            //console.log(doc.id, '=>', doc.data())
            json.push(doc.data())
          });
          resolver(json);
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
  })
}


module.exports = ModeloUsuarios