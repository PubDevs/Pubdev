const express = require("express")
const router = express.Router()
const controller = require("./controllers/controller")

router.get("/", controller.renderIndexPage)
router.get("/eventos", controller.renderEventosPage)
router.get("/registro", controller.renderRegistroPage)
router.get("/evento", controller.renderEventoPage)
router.get("/salondefama", controller.renderSalondefamaPage)
router.post("/registro/form", controller.registrarUsuario)

module.exports = router