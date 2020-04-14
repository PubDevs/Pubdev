const ModelCrearEventos = require("../model/modelcrearEventos");

var controllerAdmCrearEvento ={}
controllerAdmCrearEvento.renderadmcreareventosPage = (req, res) => {
    res.render("../../views/admcreareventos")
}


controllerAdmCrearEvento.guardarDb = (db)=>{
	this.db=db
}


controllerAdmCrearEvento.crearEvento = async (req, res) => {
    const newObj = new ModelCrearEventos(req.body, this.db)
    if(await newObj.consultarEvento()){
        newObj.crearEvento()
        res.json(true)
    }else{
        res.json(false)
    }
}


module.exports = controllerAdmCrearEvento