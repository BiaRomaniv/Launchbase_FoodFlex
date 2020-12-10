const fs = require('fs')
const express = require('express')
const routes = express.Router()
const data = require('./data')
const recipes = require('./controllers/recipes')

routes.get("/", recipes.index)
routes.get("/admin", recipes.admin)
routes.get("/receitas", recipes.receitas)
routes.get("/sobre", function(req, res) { 
    return res.render("sobre")
})
routes.get("/add", function(req,res){
    return res.render("admin/add")
})

routes.post("/", recipes.post)
routes.get("/detalhe/:id", recipes.show ) 
routes.get("/admindetalhe/:id", recipes.showAdmin ) 
routes.get("/edit/:id", recipes.edit)
routes.put("/", recipes.put)
routes.delete("/", recipes.delete)

module.exports = routes