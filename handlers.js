
const { determineMIME } = require('./util.js')
const path = require('path')
const fs = require('fs')
const TableModel = require('./models/TableModel')

async function getTableData(req, res) {
  const tableData = await TableModel.getTableData()
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(tableData)
}

function postBicycle(req, res) {

  let data = ''

  req.on('data', chunk => {
    data += chunk
  });

  req.on('end', () => {
    const parsedData = JSON.parse(data);
    console.log('Received POST data:', parsedData);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Data received successfully' }));
  });

}

function servePublicFiles(req, res) {

  // Make public files base path
  const basePath = path.join(__dirname, 'public')

  // Join base path and url, default to index.html if empty
  let filePath = ''
  if (req.url == '')
    filePath = path.join(basePath, 'index.html')
  else
    filePath = path.join(basePath, req.url)

  // Try to serve File
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - Not Found')
    } else {
      // Read and serve the file

      // Set the Content-Type header
      let contentType = determineMIME(path.extname(filePath))
      res.setHeader('Content-Type', contentType)
  
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    }
  })
}

module.exports = {
  getTableData,
  postBicycle,
  servePublicFiles,
}