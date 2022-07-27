const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
 console.log(format(new Date(), "yyy/MM/dd\tHH:mm:ss aa"));
// console.log(format(new Date(), "dd/MM/yyy\tHH:mm:ss"));
// console.log(uuid());
console.log("TESTETETE")

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

console.log(path.join(__dirname))
const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "dd/MM/yyy\tHH:mm:ss aa")}`
  // create a log to insert in file eventLog.txt - \n break line
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`
  console.log(logItem)
  
  try {
    if(!fs.existsSync(path.join(__dirname, 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, 'logs'))
    }
    // testing
    await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem)
  } catch(err) {
    console.log(err)
  }
}

module.exports = logEvents