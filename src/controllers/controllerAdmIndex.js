const modelUsuariosAdm = require("../model/modelUsuariosAdm");
var controllerAdmIndex ={
    db:null
}
controllerAdmIndex.guardarDb = (db,firebaseCliente)=>{
    this.db=db
    this.firebaseCliente = firebaseCliente
} 
controllerAdmIndex.renderAdmIndexPage = (req, res) => {
    res.render("../../views/admIndex")
}
controllerAdmIndex.renderAdmLoginPage = (req, res) => {
    res.render("../../views/admLogin")
}
controllerAdmIndex.VerificarSiEsAdm =(req, res)=>{
    //console.log(req.body)
    const newObjModelo = new modelUsuariosAdm(req.body, this.db, this.firebaseCliente)
    var stado = newObjModelo.logearAdm(req,res)
}
module.exports=controllerAdmIndex