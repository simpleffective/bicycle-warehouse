const EventEmitter = require('events')
const emitter = new EventEmitter()

emitter.on('logging', (data) => {
  console.log(`going to log ${data.message}...`)
})
emitter.on('logged', (data) => {
  console.log(`message logged within ${data.duartion} milliseconds`)
})

function log(message){
  emitter.emit('logging', {'message': message})

  var start = process.hrtime()
  global.console.log(message)
  var elapsed = process.hrtime(start)[1] / 1000000
  console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(3) + " ms - " + "note"); // print message + time

  emitter.emit('logged', {'duartion': elapsed})
}

module.exports.log = log

