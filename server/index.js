var express = require('express');
var Path = require('path');
var routes = express.Router();

var assetFolder = Path.resolve(__dirname, '../client/');
routes.use(express.static(assetFolder));

routes.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' )
})

var app = express();

app.use( require('body-parser').json() );

app.use('/', routes);

var port = process.env.PORT || 4000;
app.listen(port);
console.log("Listening on port", port);
