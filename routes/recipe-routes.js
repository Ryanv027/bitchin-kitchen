const path = require("path");
const api = require('./../api/yummly');

module.exports = function(app) {
    app.get('/api/get-recipe/:q', (req, res) => {
        let newQuery = req.params.q
        
        api.getRecipe(newQuery, (data) => {
            console.log(data)
            res.send(data)
        })

    });

    //page number with pagination 
    app.get('/api/recipe-search/:q/:p', (req, res) => {
        let newQuery = req.params.q;
        let pageNumber = req.params.p;

        api.pagination( newQuery, pageNumber, (data) => {
            res.send(data)
        });
    });
}


//Getting Yummly to work f

//setting up proper 404 and 500 errors 