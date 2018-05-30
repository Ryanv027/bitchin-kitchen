const path = require('path');
const db = require('../models');

module.exports = function(app){
    app.post('/api/create-recipe', function(req, res){
       
       let recipe_data = req.body; 
       console.log( 'req body', recipe_data);
        db.recipe.create({
            chef: recipe_data.chef,
            recipe_name: recipe_data.recipe_name,
            ingredients: recipe_data.ingredients,
            image_url: recipe_data.image_url,
            recipe_url: recipe_data.recipe_url
        })
    });
    app.get('/api/create-recipe', function(req, res){
       
        let recipe_data = req.body; 
        console.log( 'req body', recipe_data);
         db.recipe.create({
             chef: recipe_data.chef,
             recipe_name: recipe_data.recipe_name,
             ingredients: recipe_data.ingredients,
             image_url: recipe_data.image_url,
             recipe_url: recipe_data.recipe_url
         })
     });
}