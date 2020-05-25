const Modelusuarios = require("../model/modelUsuarios");

var controllerVerUsuarios ={}
controllerVerUsuarios.guardarDb = (db)=>{
	this.db=db
} 
controllerVerUsuarios.renderadmverusuariosPage = (req, res) => {
    res.render("../../views/admVerUsuarios",{token:req.session.user})
}

controllerVerUsuarios.guardarDb = (db)=>{
	this.db=db
}

controllerVerUsuarios.traertodosLosUsuarios = async (req, res) =>{
    const newObjModelo = new Modelusuarios(this.db)
    res.json(await newObjModelo.consultarUsuarios())
}

module.exports = controllerVerUsuarios
//-------------------
