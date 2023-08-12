const fs = require('fs')
const path = require('path')
const {
  getTableData
} = require('./controllers/TableController')

const server = require('http').createServer((req,res) => {

  if (req.url === '/get-table-data'){
    getTableData(req, res)
  }

  else {
    const basePath = path.join(__dirname, 'public')

    let filePath = path.join(basePath, req.url)
    
    // Default to serving 'index.html' if the URL ends with '/'
    if (filePath.endsWith('\\')) {
      filePath = path.join(filePath, 'index.html');
    }
  
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // File not found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found')
      } else {
        // Read and serve the file
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
      }
    })
  }


})

server.listen(3000, err => {
  err? console.log(err) : console.log(`listening on port 3000`)
})