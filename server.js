const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
// initialize object 
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3500

const serveFile = async (filePath, contentType, response) => {
  console.log("CONTENT TYPE " + contentType.includes('image'))
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      // Serving images with the serveFile function
      !contentType.includes('image') ? 'utf8' : ''
    )
    const data = contentType === 'application/json'
      ? JSON.parse(rawData) : rawData

    //Sending a 404 status code
    response.writeHead(
      filePath.includes('404.html') ? 404 : 200,
      { 'Content-Type': contentType }
    );

    response.end(
      contentType === 'application/json' ? JSON.stringify(data) : data
    )
  } catch (err) {
    console.log(err)
    myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
    response.statusCode = 500
    response.end()
  }
}

const server = http.createServer((req, res) => {
  //req.url - browser address
  //req.method - requisition type
  //console.log(req.url, req.method)
  //let filePath;

  // if(req.url === '/' || req.url === 'index.html') {
  //   res.statusCode = 200;
  //   res.setHeader('Content-Type', 'text/html')
  //   filePath = path.join(__dirname, 'views', 'index.html')
  //   fs.readFile(filePath, 'utf8', (err, data) => {
  //     res.end(data)
  //   })
  // }
  // switch (req.url) {
  //   case '/':
  //     res.statusCode = 200;
  //     filePath = path.join(__dirname, 'views', 'index.html');
  //     fs.readFile(filePath, 'utf8', (err, data) => {
  //       res.end(data);
  //     })
  //     break;
  //   }

  //console.log("REQ.URL " + req.url)
  // if there in no '.' in the last position the path. return  empty string
  console.log("req.url   " + req.url);
  console.log("req.method   " + req.method);
  console.log("PATH.JOIN " + path.join(__dirname))

  myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

  // get extension path url - ex. .ico, .css, .jpg, .json
  const extension = path.extname(req.url)

  console.log("EXTENSION " + extension)

  let contentType

  switch (extension) {
    case '.css':
      contentType = 'text/css'
      break
    case '.js':
      contentType = 'text/javascript'
      break
    case '.json':
      contentType = 'application/css'
      break
    case '.jpg':
      contentType = 'image/jpeg'
      break
    case '.png':
      contentType = 'image/png'
      break
    case '.txt':
      contentType = 'text/plain'
      break
    default:
      contentType = 'text/html'
  }
  //console.log("contentType depois do switch " + contentType)
  //console.log("req.url depois do switch " + req.url)

  let filePath =
    contentType === 'text/html' && req.url === '/'
      ? path.join(__dirname, '05TUT/views', 'index.html')
      // the last character is the /
      : contentType === 'text/html' && req.url.slice(-1) === '/'
        ? path.join(__dirname, '05TUT/views', req.url, 'index.html')
        : contentType === 'text/html'
          ? path.join(__dirname, '05TUT/views', req.url)
          : path.join(__dirname, req.url)

  // makes .html extension not required in the browser
  //console.log("req.url.slice(-1) " + req.url.slice(-1))
  if (!extension && req.url.slice(-1) !== '/') filePath += '.html'
 // console.log("FILE PATH " + filePath)

  const fileExists = fs.existsSync(filePath)

  console.log("FileExists " + fileExists)

  if (fileExists) {
    console.log("FILE EXISTS")
    // serve the file
    serveFile(filePath, contentType, res)

  } else {
    console.log("FILE NOT EXISTS")
    // 404
    // 301 redirect
    // path.parse(filePath) return an object with {
    //root: 'C:\\',
    //dir: 'C:\\Desenvolvimento\\@Cursos\\DaveGray\\nodes\\node\\05TUT\\views',
    //base: 'old.html',
    //ext: '.html',
    //name: 'old'
    //}

    console.log("&&&&&&&   " + path.parse(filePath).base)

    switch (path.parse(filePath).base) {
      case 'old-page.html':
        res.writeHead(301, { 'Location': '/new-page.html' })
        res.end()
        break

      case 'www-page.html':
        res.writeHead(301, { 'Location': '/' })
        res.end()
        break

      default:
        // serve a 404 response
        serveFile(path.join(__dirname, '05TUT/views', '404.html'), 'text/html', res)
    }
  }

});


server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// add listener for the log event
// myEmitter.on('log', (msg, other) => logEvents(msg, other));

//   // trigger/emmiter the event
// myEmitter.emit('log', 'Log event Emitted!!!', 'teste');
