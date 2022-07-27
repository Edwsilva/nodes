
var http = require('http');
var url = require('url')
var fs = require('fs')

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   var u = url.parse(req.url, true);
//   console.log(u)  
//   try {
//     const data = fs.readFileSync(__dirname + u.pathname);
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
//   res.end();
// }).listen(8080);


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  //console.log(req) 
  console.log(url.parse(req.url, true).query.year)
  console.log(url.parse(req.url, true).query.month)
  var q = url.parse(req.url, true).query;
  //var txt = q.year + " " + q.month;
  var txt = q.year + "--- "+ q.month;
  res.end(txt)
  // OR res.end(url.parse(req.url, true).query.year + url.parse(req.url, true).query.month);
}).listen(8080);