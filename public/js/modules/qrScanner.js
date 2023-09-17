import { notifyReaderSuccess } from "./form.js";

let html5QrcodeScanner = null;

export function init(){
  html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 5},
  /* verbose= */ false);
}
function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  notifyReaderSuccess(decodedText)
}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  console.warn(`Code scan error = ${error}`);
}

export function readQR() {
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);
}

export function stopQR() {
  html5QrcodeScanner.clear()
}