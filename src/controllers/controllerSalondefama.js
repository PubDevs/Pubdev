const Modelusuarios = require("../model/modelUsuarios");

var controllerSalon={}

controllerSalon.renderSalondefamaPage = (req, res) => {
    res.render("../../views/salonFama")
}

controllerSalon.guardarDb = (db)=>{
	this.db=db
} 

controllerSalon.traerUsuarios=async (req,res)=>{
    const newObjModelo = new Modelusuarios(this.db)
    res.json(await newObjModelo.consultarUsuarios())
}



module.exports =controllerSalon