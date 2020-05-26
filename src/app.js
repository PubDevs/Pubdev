const path = require("path")
const express = require("express")
const app = express()
const routerIndex = require("./rutas/rutasUser")
const routerAdm = require("./rutas/rutasAdm")
const routeResource = require("./rutas/rutasResource")
const session = require('express-session');
const compress = require("compression")
const hbs = require("hbs")
app.use(session({
    secret: 'lssl, i love forever',
    resave: true,
    saveUninitialized: true,
    expires :60 * 60 * 24
}));

app.use(express.urlencoded({ extended: false})) // midelware 
app.use(express.json()) // todo los datos se parcean a json
app.use("/assets/css",express.static(__dirname + '/../public/assets/css'))// damos aceso statico a la carpeta public 
app.use("/assets/sass",express.static(__dirname + '/../public/assets/sass'))// damos aceso statico a la carpeta public 
app.use("/assets/webfonts",express.static(__dirname + '/../public/assets/webfonts'))// damos aceso statico a la carpeta public 
app.use("/images",express.static(__dirname + '/../public/images'))// damos aceso statico a la carpeta public 
app.set("views", "views")
app.set("view engine", "hbs")//llamamos al motor de render de las plantillas html



app.use("/", routerIndex)
app.use("/sudo",routerAdm)
app.use("/resource",routeResource)
app.use(compress())

hbs.registerPartials(__dirname + "/../views/utilidades")


app.listen(3000)
console.log("Servidor encendido abre --> http://localhost:3000")

app.use(/^()*/,function(req, res, next) {
    res.render("../../views/404")
})