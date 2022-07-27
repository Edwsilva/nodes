var url = require('url');
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
//Parse the address:
var q = url.parse(adr, true);
console.log(q)
// Url {
//   protocol: 'http:',
//   slashes: true,
//   auth: null,
//   host: 'localhost:8080',
//   port: '8080',
//   hostname: 'localhost',
//   hash: null,
//   search: '?year=2017&month=february',
//   query: [Object: null prototype] { year: '2017', month: 'february' },
//   pathname: '/default.htm',
//   path: '/default.htm?year=2017&month=february',
//   href: 'http://localhost:8080/default.htm?year=2017&month=february'
// }

/*The parse method returns an object containing url properties*/
console.log(q.host);
console.log(q.pathname);
console.log(q.search !== ''); //true

/*The query property returns an object with all the querystring parameters as properties:*/
var qdata = q.query;
console.log(qdata.year);
console.log(qdata.month);
// OR q.query.month