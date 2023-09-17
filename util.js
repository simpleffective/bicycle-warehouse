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

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are 0-based, so add 1
  const day = date.getDate();

  // Create a formatted string in dd-mm-yyyy format
  return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
  randomDate,
  formatDate,
  determineMIME
}

