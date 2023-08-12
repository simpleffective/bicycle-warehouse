
const path = require('path')
const fs = require('fs')
const TableModel = require('./models/TableModel')

async function getTableData(req, res) {
  const tableData = await TableModel.getTableData()
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(tableData)
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
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    }
})

}
module.exports = {
  getTableData,
  servePublicFiles,
}