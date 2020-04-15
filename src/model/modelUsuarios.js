
const ModeloUsuarios = function (db){ 
    this.db=db.database()
}
ModeloUsuarios.prototype.consultarUsuarios = async function(){
    return new Promise (resolver => {
        this.db.ref("Cuentas/Usuarios").on("value", (data)=>{
            this.db.ref("Cuentas/Usuarios").off()
                resolver({datos: data.val()})
        })
    })
}

module.exports = ModeloUsuarios