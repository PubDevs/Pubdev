var configDBrealtime = require('./config/configDBfirebaserelatime')
var db = configDBrealtime.ejecutarEstadoDb()
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
const controllerRegistro = require("./controllers/controllerRegistro")
controllerRegistro.guardarDb(db)
const controllerevento = require("./controllers/controllerEvento")
const controllerSalonDeFama = require("./controllers/controllerSalondefama")
// lista de controladores adm
const controllerAmdIndex = require("./controllers/controllerAdmIndex")
const controllerAdmCrearEvento = require("./controllers/controllerAdmCrearEeventos")
controllerAdmCrearEvento.guardarDb(db)
const controllerVerUsuarios = require("./controllers/controllerAdmverUsuarios")
controllerVerUsuarios.guardarDb(db)

//lista de rutas
router.get("/", controllerIndex.renderIndexPage)
router.get("/eventos", controllerEventos.renderEventosPage)
router.get("/registro", controllerRegistro.renderRegistroPage)
router.get("/evento", controllerevento.renderEventoPage)
router.get("/salondefama", controllerSalonDeFama.renderSalondefamaPage)
router.post("/registro/form", multer.single('foto'), controllerRegistro.registrarUsuario)
//lusta de rutas admin
router.get("/admpubdevindex", controllerAmdIndex.renderAdmIndexPage)
router.get("/admpubdevcreareventos", controllerAdmCrearEvento.renderadmcreareventosPage)
router.post("/admpubdevcreareventos/form", controllerAdmCrearEvento.crearEvento)
router.get("/admpubdevverusuarios", controllerVerUsuarios.renderadmverusuariosPage)
router.get("/admpubdevverusuarios/traer", controllerVerUsuarios.traertodosLosUsuarios)
//router.get("/admpubdevcreareventos", controllerAdmCrearEvento.)

module.exports = router