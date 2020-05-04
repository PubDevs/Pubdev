const path = require("path")
const express = require("express")
const app = express()
const router = require("./router")
const session = require('express-session');

app.use(session({
    secret: 'lssl, i love forever',
    resave: true,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended: false})) // midelware 
app.use(express.json()) // todo los datos se parcean a json
app.use(express.static(__dirname + '/../public'))// damos aceso statico a la carpeta public 
app.set("views", "views")
app.set("view engine", "hbs")//llamamos al motor de render de las plantillas html

app.use("/", router)

app.listen(3000)
console.log("Servidor encendido abre --> http://localhost:3000")