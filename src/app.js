const path = require("path")
const express = require("express")
const app = express()
const routerIndex = require("./rutas/rutasUser")
const routerAdm = require("./rutas/rutasAdm")
const routeResource = require("./rutas/rutasResource")
const session = require('express-session');
const compress = require("compression")
app.use(session({
    secret: 'lssl, i love forever',
    resave: true,
    saveUninitialized: true,
    expires :60 * 60 * 24
}));

app.use(express.urlencoded({ extended: false})) // midelware 
app.use(express.json()) // todo los datos se parcean a json
app.use(express.static(__dirname + '/../public'))// damos aceso statico a la carpeta public 
app.set("views", "views")
app.set("view engine", "hbs")//llamamos al motor de render de las plantillas html



app.use("/", routerIndex)
app.use("/sudo",routerAdm)
app.use("/resource",routeResource)
app.use(compress())

app.listen(3000)
console.log("Servidor encendido abre --> http://localhost:3000")

app.use(/^()*/,function(req, res, next) {
    res.render("../../views/404")
})