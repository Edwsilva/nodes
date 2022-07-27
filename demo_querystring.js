var http = require('http');
var url = require('url');

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