var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.cert', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var docNumber = 23;

app.use(bodyParser.text())

// configure headers for CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  console.log('GET received');
  res.send('Hello');
});

app.post('/', function (req, res) {
  console.log('POST received');
  console.log(req.body);
  docNumber++;
  res.send('OK. ' + docNumber);
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

httpsServer.listen(3443, function () {
  console.log('Example app listening on port 3443!');
});
