const express = require("express")
const router = express.Router()
const path=require("path")
const configResource= require("../config/configResource")
const midResource = require("../middleware/middleware.resource")





router.get("/script",midResource.validarScript,(req,res)=>{
    res.sendFile(path.join(__dirname, '../../public/assets/js', req.script.src))
})

module.exports=router