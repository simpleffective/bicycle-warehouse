const {
  getTableData,
  servePublicFiles
} = require('./handlers.js')

const PORT = 3000
const BASE = `http://localhost:${PORT}`

const server = require('http').createServer((req,res) => {

  // Build the URL object
  let parsedUrl = new URL(req.url, BASE);

  // Extract the path from the URL object
  let path = parsedUrl.pathname;

  // Clean from trailing slashes
  const newPath = path.replace(/^\/+|\/+$/g,'');

  // Set clean url
  req.url = newPath;
  if (req.url === 'get-table-data'){
    getTableData(req, res)
  } else {
    servePublicFiles(req, res)
  }

})

server.listen(PORT, err => {
  err? console.log(err) : console.log(`listening on port ${PORT}`)
})