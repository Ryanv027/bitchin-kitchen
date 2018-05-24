const axios = require("axios")

module.exports = function (app){
    const APP_ID = '24c4796b';
    const APP_KEY = 'd781e3e92499c596ed81d523cb4ff29f';

    let matchingRecipes = function( query = '', allowedIngredient = '', allowedCuisine = '', cb) {

        let queryParams = {
            _app_id: APP_ID,
            _app_key: APP_KEY,
            q: query,
            allowedIngredient: allowedIngredient,
            allowedCuisine: allowedCuisine,
        }
    
        let queryString = Array();
    
        for (const key in queryParams) {
            if (queryParams.hasOwnProperty(key)) {
                const queryPair = `${key}=${queryParams[key]}`;
                queryString.push(queryPair);
            }
        }

        let queryStringJoined = queryString.join('&');

        let hitApiWithThis = `http://api.yummly.com/v1/api/recipes?${queryStringJoined}`
        
        axios.get(hitApiWithThis)
        .then(data => {
            console.log(data.data.matches);
            cb(JSON.stringify(data.data.matches));
        });
    }

    let pagination = function( query = '', page = '', cb) {

        pageNum = (page-1)*10+1;

        let queryParams = {
            _app_id: APP_ID,
            _app_key: APP_KEY,
            q: query,
            start: pageNum,
            maxResult: 10,
        }
    
        let queryString = Array();
    
        for (const key in queryParams) {
            if (queryParams.hasOwnProperty(key)) {
                const queryPair = `${key}=${queryParams[key]}`;
                queryString.push(queryPair);
            }
        }

        let queryStringJoined = queryString.join('&');

        let hitApiWithThis = `http://api.yummly.com/v1/api/recipes?${queryStringJoined}`
        
        axios.get(hitApiWithThis)
        .then(data => {
            console.log(data.data.matches);
            cb(JSON.stringify(data.data.matches));
        });
    }

    let getRecipe = function(recipeId){
        axios.get(`http://api.yummly.com/v1/api/recipe/${recipeId}?_app_id=${APP_ID}&_app_key=${APP_KEY}`)
            .then(newData => {       
                console.log(newData);
                let recipeResponse = {
                    Recipe: newData.data.name,
                    Ingredients: newData.data.ingredientLines,
                    Directions: newData.data.source.sourceRecipeUrl,
                }
                res.json( recipeResponse );
            });
    }

    // look at express routing and handling params
    //specific recipe 
    app.get('/recipe-search/:q', (req, res) => {
        let newQuery = req.params.q;
        let pageNumber = req.params.p;
        
        matchingRecipes( newQuery, function(data){
            res.send(data)
        });
    });

    //page number with pagination 
    app.get('/recipe-search/:q/:p', (req, res) => {
        let newQuery = req.params.q;
        let pageNumber = req.params.p;
        
        pagination( newQuery, pageNumber, function(data){
            res.send(data)
        });
    });

}






    