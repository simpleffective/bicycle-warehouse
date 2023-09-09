require('dotenv').config()

const {
  getTableData,
  postBicycle,
  servePublicFiles,
  onSignIn
} = require('./handlers.js')

const PORT = 3000
const BASE = `http://localhost:${process.env.PORT}`

const server = require('http').createServer((req,res) => {
  console.log(req.url)
  // Build the URL object
  let parsedUrl = new URL(req.url, BASE);
  
  // Extract the path from the URL object
  let path = parsedUrl.pathname;

  // Clean from trailing slashes
  const newPath = path.replace(/^\/+|\/+$/g,'');

  // Set clean url
  req.url = newPath;

  // Route
  if (req.url === 'get-table-data'){
    getTableData(req, res)
  } else if (req.url === 'login') {
    onSignIn(req, res)
  } else if (req.url === 'post-bicycle' && req.method.toLowerCase() === 'post') {
    postBicycle(req, res)
  } else {
    servePublicFiles(req, res)
  }

})

server.listen(PORT, err => {
  err? console.log(err) : console.log(`listening on port ${PORT}`)
})
