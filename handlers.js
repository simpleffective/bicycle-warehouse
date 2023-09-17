
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

      // build the row entry
      const entry = {
        'id': fields.id[0],
        'img_filename': '/public/uploads/' + photo.originalFilename,
        'textId': fields.textId[0],
        'person': fields.person[0],
        'email': fields.email[0]
      }

      // save the uploaded photo
      fs.renameSync(photo.filepath, path.join(__dirname, entry.img_filename));

      // send entry to the DB
      const result = await TableModel.createEntry(entry);
      
      // saved ok
      res.writeHead(200, { 
        'Content-Type': 'application/json',
      })
      res.end(JSON.stringify(result))

  } catch (err) {
      console.error(err);
      res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
      res.end(String(err));
      return;
  }

}

function servePublicFiles(req, res) {

  // Join base path and url, default to index.html if empty
  let filePath = ''
  if (req.url == '')
    filePath = path.join(__dirname, '/public/' ,'index.html')
  else
    filePath = path.join(__dirname, req.url)

  // Try to serve File
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - Not Found')

    } else {
      // Read and serve the file
      const stats = fs.statSync(filePath);
      if (!stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found')
        return
      }
      
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