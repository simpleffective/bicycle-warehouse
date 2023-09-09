
const { determineMIME } = require('./util.js')
const path = require('path')
const fs = require('fs')
const TableModel = require('./models/TableModel')
const formidable = require('formidable')

async function getTableData(req, res) {
  const tableData = await TableModel.getTableData()
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(tableData)
}

async function postBicycle(req, res) {

  const form = formidable.formidable({});
  let fields;
  let files;
  try {
      [fields, files] = await form.parse(req);
      
      const photo = files.capture[0];
      const currPath = photo.filepath;
      const uploadPath = '/public/uploads/' + photo.originalFilename;

      fs.renameSync(currPath, path.join(__dirname, uploadPath));

      console.log('File saved at:', uploadPath);
      
      const entry = {
        'id': fields.id[0],
        'img_filename': uploadPath,
        'textId': fields.textId[0],
        'person': fields.person[0],
        'email': fields.email[0]
      }

      try {

        const result = await TableModel.createEntry(entry);
        
        res.writeHead(200, { 
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(result),
        })
        res.end(JSON.stringify(result))
      
      } catch (err) {
        
        console.error('Error:', err)
        res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
        res.end(String(err));

      }
      
  } catch (err) {
      console.error(err);
      res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
      res.end(String(err));
      return;
  }

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

function onSignIn(req, res) {
  console.log("OnSignIn")
}

module.exports = {
  getTableData,
  postBicycle,
  servePublicFiles,
  onSignIn
}