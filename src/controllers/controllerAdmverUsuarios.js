const Modelusuarios = require("../model/modelusuarios");

var controllerVerUsuarios ={}
controllerVerUsuarios.renderadmverusuariosPage = (req, res) => {
    res.render("../../views/admVerUsuarios")
}

controllerVerUsuarios.guardarDb = (db)=>{
	this.db=db
}

controllerVerUsuarios.traertodosLosUsuarios = async (req, res) =>{
    const newObjModelo = new Modelusuarios(this.db)
    res.json((await newObjModelo.consultarUsuarios()).datos)
}

module.exports = controllerVerUsuarios