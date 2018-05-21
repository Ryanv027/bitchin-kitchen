var path = require("path");

module.exports = function(app) {
    app.get( '/api/welcome', (req, res) => {
        res.send({ welcome: 'welcome to the universe!' });
    });
}