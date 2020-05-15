var configDBrealtime = require('../config/configDBfirebaserelatime')
var firebaseCliente = configDBrealtime.crearConexionCliente(require("firebase"))

var db = configDBrealtime.crearConexionAdmin(require("firebase-admin"))
const express = require("express")
const router = express.Router()
const Multer = require('multer');
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // maximo 5 MB
    }
  });

// lista de controladores adm
const controllerAmdIndex = require("../controllers/controllerAdmIndex")
controllerAmdIndex.guardarDb(db,firebaseCliente)
const controllerAdmCrearEvento = require("../controllers/controllerAdmCrearEeventos")
controllerAdmCrearEvento.guardarDb(db)
const controllerVerUsuarios = require("../controllers/controllerAdmverUsuarios")
controllerVerUsuarios.guardarDb(db)



//middleware creados
const checkoutUser = require("../middleware/middleware.checkoutuser")


//lusta de rutas admin
router.get("/",checkoutUser.isAdmin ,controllerAmdIndex.renderAdmIndexPage)
router.get("/crear-evento" , checkoutUser.isAdmin, controllerAdmCrearEvento.renderadmcreareventosPage)
router.post("/crear-evento/form",multer.single('foto'),controllerAdmCrearEvento.crearEvento)
router.get("/ver-usuarios", checkoutUser.isAdmin ,controllerVerUsuarios.renderadmverusuariosPage)
router.get("/ver-usuarios/traer", controllerVerUsuarios.traertodosLosUsuarios)
router.get("/login", controllerAmdIndex.renderAdmLoginPage)

router.post("/login", controllerAmdIndex.VerificarSiEsAdm)
router.get("/cerrar-session", checkoutUser.isAdmin,function(req,res){
  req.session.destroy();
})


module.exports=router