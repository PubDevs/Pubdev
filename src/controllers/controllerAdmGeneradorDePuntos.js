const modelGeneradordepuntos = require("../model/modelGeneradorDePuntos");
var controllerAdmGeneradorDePuntos ={
    db:null
}
controllerAdmGeneradorDePuntos.guardarDb = (db,firebaseCliente)=>{
    this.db=db
    this.firebaseCliente = firebaseCliente
} 
controllerAdmGeneradorDePuntos.renderAdmGeneradorDePuntosPage = (req, res) => {
    res.render("../../views/generadordepuntos/generadordecodigo",{token:req.session.user})
}

controllerAdmGeneradorDePuntos.generarCodigo = async (req, res) =>{
    const objModel = new modelGeneradordepuntos(req.body,this.db)
    res.send(await objModel.GuardarCodigo())
}

controllerAdmGeneradorDePuntos.bucarCodigos = async(req, res) => {
    const objModel = new modelGeneradordepuntos(null,this.db)
    res.send(await objModel.bucarCodigos())
}
controllerAdmGeneradorDePuntos.cambiaresadodecodigogenerado = async(req, res)=>{
    const objModel = new modelGeneradordepuntos(req.body,this.db)
    res.send(await objModel.cambiarestadodelcodigo())
}
controllerAdmGeneradorDePuntos.cargarPuntos = async(req, res)=>{
    const objModel = new modelGeneradordepuntos(req.body,this.db)
    res.send(await objModel.cargarPuntosdb())
}
module.exports=controllerAdmGeneradorDePuntos