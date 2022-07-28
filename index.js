const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

// initialize object
const myEmitter = new MyEmitter();

// add listener for the log event
myEmitter.on("log", (msg, other) => logEvents(msg, other));

setTimeout(() => {
  // trigger/emmiter the event
  myEmitter.emit("log", "msg Log event Emitted!!!", "other msg", "teste1");
}, 2000);
