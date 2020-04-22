const ModelCrearEventos = require("../model/modelcrearEventos");
const sha1 = require('sha1');

var controllerAdmCrearEvento ={}
controllerAdmCrearEvento.renderadmcreareventosPage = (req, res) => {
    res.render("../../views/admcreareventos")
}

controllerAdmCrearEvento.guardarDb = (db)=>{
	this.db=db
}

controllerAdmCrearEvento.crearEvento = async (req, res) => {
    const newObj = new ModelCrearEventos(req.body, this.db)
    if(await newObj.crearEvento()){
        await newObj.guardarImgFireStorage(req.file, "eventos/"+sha1(req.body.nombre)+".png")
        res.redirect("/admpubdevindex")
    }else{
        res.redirect("/admpubdevcreareventos")
    }
}

module.exports = controllerAdmCrearEvento