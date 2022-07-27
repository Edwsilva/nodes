const EventEmitter = require('events')
const fs = require('fs')
const path = require('path')

const emitter = new EventEmitter()

// emitter.on('log', (message) => {
//  console.log(message)
// })

// create the event
emitter.on('log', (message) => {
  console.log(message)
    fs.appendFile(path.join(__dirname, 'log.txt'), message, err => {
        if (err) throw err
    })
})


function log(message) {
    // trigger the event
    emitter.emit('log', message)
} 

module.exports = log