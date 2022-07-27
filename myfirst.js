var http = require('http');

// http.createServer( (req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(8080);

var dt = require('./myfirstmodule');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time are currently: " + dt.myDateTime());
  res.write( req.url); //traz a parte da URL que vem depois do nome do dominio / ou /teste
  dt.myFuncionWithParametro(10, 50)
  res.end("Finally");
}).listen(8080);