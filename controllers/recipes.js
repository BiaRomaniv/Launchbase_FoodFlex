const fs = require('fs')
const data = require('../data.json')

exports.receitas = function(req, res) { 
    return res.render("receitas", { items: data.recipes })
}

exports.index = function(req, res) { 
    return res.render("index", { items: data.recipes })
}

exports.admin = function(req, res) { 
    return res.render("admin/admin", { items: data.recipes  })
}


exports.show = function(req,res){
    const { id } = req.params 
    const foundRecipe = data.recipes.find(function(recipe) {
        return recipe.id == id     
    })

    if (!foundRecipe) return res.send("recipe not found!")

    const recipes = {
        ...foundRecipe, //SPREAD     
        ...req.body,
    }
   
    return res.render('detalhe', { recipes })
}

exports.showAdmin = function(req,res){// 
    const { id } = req.params     
    const foundRecipe = data.recipes.find(function(recipe) {
        return recipe.id == id        
    })
    if (!foundRecipe) return res.send("recipe not found!")
   
    const recipes = {
        ...foundRecipe,     
        ...req.body,
    }
    
    return res.render('admin/admindetalhe', { recipes })   
}

exports.post = function(req,res){
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Por favor preencha todos os campos')
        }
    }

    let { image, ingredients, preparation, information, title } = req.body 
    const id = Number(data.recipes.length) 
    data.recipes.push({ 
        id,
        title,
        image,
        ingredients,
        preparation,
        information
    })
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("write file error!")
        return res.redirect("/receitas")
    })
}

exports.edit = function(req,res){
    const { id } = req.params   
    const foundRecipe = data.recipes.find(function(recipe) {
        return recipe.id == id        
    })

    if (!foundRecipe) return res.send("recipe not found!")
    
    const recipes = {
        ...foundRecipe, 
    }
       
    return res.render(`admin/edit`, { recipes })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0
    const foundRecipe = data.recipes.find(function(recipe, foundIndex) {
    
    if (id == recipe.id ) {
        index = foundIndex
        return true        
        }
    })
    if (!foundRecipe) return res.send("recipe not found!")

    const recipes = {
       ...foundRecipe,
       ...req.body
   }

   data.recipes[index] = recipes

   fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
       if (err) return res.send("write file error")
       return res.render('detalhe', { recipes })
    })   
 }

 exports.delete = function(req, res) {
    const { id } = req.body
    const filteredRecipe = data.recipes.filter(function(recipe) {
        return recipe.id != id
    })

    data.recipes = filteredRecipe
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("write file error")
        return res.redirect("receitas")
    })
}