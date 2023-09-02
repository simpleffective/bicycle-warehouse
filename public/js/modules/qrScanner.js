


function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  console.log(`Code matched = ${decodedText}`, decodedResult);
  console.log("yes")
}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  console.warn(`Code scan error = ${error}`);
}

// This method will trigger user permissions
Html5Qrcode.getCameras().then(devices => {
  /**
   * devices would be an array of objects of type:
   * { id: "id", label: "label" }
   */
  if (devices && devices.length) {
    let cameraId = devices[0].id;
    return cameraId;
  }
}).then(cameraId => {
  const html5QrCode = new Html5Qrcode("QRreader");
  html5QrCode.start(
    cameraId, 
    {
      fps: 10,    // Optional, frame per seconds for qr code scanning
      qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
    },
    (decodedText, decodedResult) => {
      console.log(`Code matched = ${decodedText}`, decodedResult);
    },
    (errorMessage) => {
      // parse error, ignore it.
    })
  .catch((err) => {
    // Start failed, handle it.
  });
}).catch(err => {
  // handle err
});




export function readQR() {
  
}