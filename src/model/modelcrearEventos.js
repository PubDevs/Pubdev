
const ModeloCrearEventos = function (datos, db){ 
    this.db=db.database()
    this.datos = datos
    
}
ModeloCrearEventos.prototype.consultarEvento = async function(){
    return new Promise (resolver => {
        this.db.ref("ProximosEventos/"+this.datos.tipoEvento+"/"+this.datos.nombre).on("value", (data)=>{
            this.db.ref("ProximosEventos/"+this.datos.tipoEvento+"/"+this.datos.nombre).off()
                resolver({datos: data.val()})
        })
    })
}
ModeloCrearEventos.prototype.crearEvento = function(){
    var query  = this.datos
    query.img = null
    query.estado = "En proceso"
    this.db.ref("ProximosEventos/"+this.datos.tipoEvento+"/"+this.datos.nombre).set(query)
}

module.exports = ModeloCrearEventos