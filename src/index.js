/**
 * Created by user on 2/07/16.
 */
var express = require('express');
var httpProxy = require('http-proxy');

var apiForwardingUrl = 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyC--TkdunlR6q_w_zJmJfxD7he4rlY7LZk';

var server = express();
server.set('port', 3002);
server.use(express.static(__dirname + '/app'));

var apiProxy = httpProxy.createProxyServer();

console.log('Forwarding API requests to ' + apiForwardingUrl);

// Grab all requests to the server with "/gonzalo/".
server.all("/gonzalo/*", function(req, res) {
    console.log("Request made to /gonzalo/");
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

server.listen(server.get('port'), function() {
    console.log('Express server listening on port ' + server.get('port'));
})