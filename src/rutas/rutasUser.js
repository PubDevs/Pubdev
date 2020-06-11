const express = require("express")
const router = express.Router()
const Multer = require('multer');
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // maximo 5 MB
    }
  });
var configDBrealtime = require('../config/configDBfirebaserelatime')
var db = configDBrealtime.crearConexionAdmin(require("firebase-admin"))


//lista de controlladores
const controllerIndex = require("../controllers/controllerIndex")
const controllerEventos = require("../controllers/controllerEventos")
const controllerPuntos = require("../controllers/controllerPuntos")
const controllerRegistro = require("../controllers/controllerRegistro")
const controllerRegistroPuntos = require("../controllers/controllerRegistroPuntos")
controllerRegistro.guardarDb(db)
const controllerevento = require("../controllers/controllerEvento")
const controllerevento2 = require("../controllers/controllerEvento2")
const controllerevento3 = require("../controllers/controllerEvento3")
const controllerevento4 = require("../controllers/controllerEvento4")
const controllerSalonDeFama = require("../controllers/controllerSalondefama")
const controllerEquipo = require("../controllers/controllerOrganizadores")


//lista de rutas
router.get("/", controllerIndex.renderIndexPage)
router.get("/eventos", controllerEventos.renderEventosPage)
router.get("/registro", controllerRegistro.renderRegistroPage)
router.get("/evento", controllerevento.renderEventoPage)
router.get("/evento2", controllerevento2.renderEvento2Page)
router.get("/evento3", controllerevento3.renderEvento3Page)
router.get("/evento4", controllerevento4.renderEvento4Page)
router.get("/salondefama", controllerSalonDeFama.renderSalondefamaPage)
router.post("/registro/form", multer.single('foto'), controllerRegistro.registrarUsuario)
router.get("/puntos", controllerPuntos.renderPuntosPage)
router.get("/registroPuntos", controllerRegistroPuntos.renderPuntosPageRegistro)
router.get("/equipo", controllerEquipo.renderOrganizadoresPage)

module.exports = router