const fs = require('fs')
const path = require('path')
async function getData() {
  let a = fs.readFile(path.join(__dirname ,'demo-live.json'), {encoding: 'utf8'}, (err, data) => {
    console.log("in callback")
    return '[' + data + ']'
  })
  console.log(`a ${a}`)
}

console.log(getData())