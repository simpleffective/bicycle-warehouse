function determineMIME(fileExtension) {
  let contentType = 'text/plain'; // Default MIME type

  if (fileExtension === '.html') {
    contentType = 'text/html';
  } else if (fileExtension === '.css') {
    contentType = 'text/css';
  } else if (fileExtension === '.js') {
    contentType = 'application/javascript';
  } else if (fileExtension === '.svg') {
    contentType = 'image/svg+xml'
  }
  return contentType
}

module.exports = {
  determineMIME
}

