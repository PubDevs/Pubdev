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
const controllerevento = require("./controllers/controllerEvento")
const controllerSalonDeFama = require("./controllers/controllerSalondefama")

//lista de rutas
router.get("/", controllerIndex.renderIndexPage)
router.get("/eventos", controllerEventos.renderEventosPage)
router.get("/registro", controllerRegistro.renderRegistroPage)
router.get("/evento", controllerevento.renderEventoPage)
router.get("/salondefama", controllerSalonDeFama.renderSalondefamaPage)
router.post("/registro/form", multer.single('file'), controllerRegistro.registrarUsuario)

module.exports = router