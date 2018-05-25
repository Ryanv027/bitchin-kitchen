const axios = require("axios")

module.exports = {
    
    pagination: ( query = '', page = '', cb) => {
        const APP_ID = '24c4796b';
        const APP_KEY = 'd781e3e92499c596ed81d523cb4ff29f';
        pageNum = (page-1)*10+1;

        let queryParams = {
            _app_id: APP_ID,
            _app_key: APP_KEY,
            q: query,
            maxResult: 10,
            start: pageNum,
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
            cb(JSON.stringify(data.data.matches));
        });
    },
    getRecipe: (recipeId = '', cb) => {
        const APP_ID = '24c4796b';
        const APP_KEY = 'd781e3e92499c596ed81d523cb4ff29f';

        axios.get(`http://api.yummly.com/v1/api/recipe/${recipeId}?_app_id=${APP_ID}&_app_key=${APP_KEY}`)
            .then(data => {       
                //console.log(data.data);
                // let recipeResponse = {
                //     Recipe: newData.data.name,
                //     Ingredients: newData.data.ingredientLines,
                //     Directions: newData.data.source.sourceRecipeUrl,
                // }
                cb(JSON.stringify(data.data))
            });
    }
}






    