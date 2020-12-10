const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./routes")
const server = express()
const recipes = require("./data")
const methodOverride = require('method-override')

server.use(express.urlencoded({ extended: true})) // habilita a leitura do req.body
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set("view engine", "njk") // template engine

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, function() {
    console.log("server is running")
})