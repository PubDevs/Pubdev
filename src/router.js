var configDBrealtime = require('./config/configDBfirebaserelatime')
var db = configDBrealtime.generateDB()
var firebaseCliente = configDBrealtime.generateFirebasecliente()
const express = require("express")
const router = express.Router()
const Multer = require('multer');
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // maximo 5 MB
    }
  });
//lista de controlladores
const controllerIndex = require("./controllers/controllerIndex")
const controllerEventos = require("./controllers/controllerEventos")
const controllerPuntos = require("./controllers/controllerPuntos")
const controllerRegistro = require("./controllers/controllerRegistro")
controllerRegistro.guardarDb(db)
const controllerevento = require("./controllers/controllerEvento")
const controllerSalonDeFama = require("./controllers/controllerSalondefama")
const controllerEquipo = require("./controllers/controllerOrganizadores")


// lista de controladores adm
const controllerAmdIndex = require("./controllers/controllerAdmIndex")
controllerAmdIndex.guardarDb(db,firebaseCliente)
const controllerAdmCrearEvento = require("./controllers/controllerAdmCrearEeventos")
controllerAdmCrearEvento.guardarDb(db)
const controllerVerUsuarios = require("./controllers/controllerAdmverUsuarios")
controllerVerUsuarios.guardarDb(db)



//middleware creados
const checkoutUser = require("./middleware/middleware.checkoutuser")

//lista de rutas
router.get("/", controllerIndex.renderIndexPage)
router.get("/eventos", controllerEventos.renderEventosPage)
router.get("/registro", controllerRegistro.renderRegistroPage)
router.get("/evento", controllerevento.renderEventoPage)
router.get("/salondefama", controllerSalonDeFama.renderSalondefamaPage)
router.post("/registro/form", multer.single('foto'), controllerRegistro.registrarUsuario)
router.get("/puntos", controllerPuntos.renderPuntosPage)
router.get("/equipo", controllerEquipo.renderOrganizadoresPage)

//lusta de rutas admin
router.get("/sudo",checkoutUser.isAdmin ,controllerAmdIndex.renderAdmIndexPage)
router.get("/sudo/crear-evento" , checkoutUser.isAdmin, controllerAdmCrearEvento.renderadmcreareventosPage)
router.post("/sudo/crear-evento/form",multer.single('foto'),controllerAdmCrearEvento.crearEvento)
router.get("/sudo/ver-usuarios", checkoutUser.isAdmin ,controllerVerUsuarios.renderadmverusuariosPage)
router.get("/sudo/ver-usuarios/traer", controllerVerUsuarios.traertodosLosUsuarios)
router.get("/sudo/login", controllerAmdIndex.renderAdmLoginPage)

router.post("/sudo/login", controllerAmdIndex.VerificarSiEsAdm)
router.get("/sudo/cerrar-session", checkoutUser.isAdmin,function(req,res){
  req.session.destroy();
})

//router.get("/admpubdevcreareventos", controllerAdmCrearEvento.)

module.exports = router