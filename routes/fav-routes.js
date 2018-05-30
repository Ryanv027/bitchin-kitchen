const path = require('path');
const db = require('../models');

module.exports = function(app){
    app.get('/api/favorites/:userid', function(req, res){
       console.log( 'req body', req.params.userid);
        db.recipe.findAll({where: {chef: req.params.userid}})
        .then(recipes => {res.json(recipes)});
    });
}