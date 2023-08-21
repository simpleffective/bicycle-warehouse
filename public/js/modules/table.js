import { init as initPagination } from './pagination.js'
export {
  renderTablePage,
  init
}

const tbody = document.querySelector('table').querySelector('tbody')
const ROWS_PER_PAGE = 12;
let tableData = null;

function init() {
  const TABLE_DATA_URL = '/get-table-data'

  fetch(TABLE_DATA_URL)
  .then( (response) => response.json())
  .then( (data) => {
    debugger
    tableData = data;
    renderTablePage(1);
    initPagination(tableData.length)
  })
}

function tableAction(filter) {
  // sort, filter, etc...
  // let filteredData = ... ;
  // initPagination(filteredData)
}

function renderEmptyTable() {
  tbody.innerHTML = '';
  // TODO nicer in the future
}

function renderTablePage(page) {

  if (tableData.length == 0) {
    renderEmptyTable();
    return;
  }

  let start = (page - 1) * ROWS_PER_PAGE
  let end = start + ROWS_PER_PAGE
  tableData.slice(start, end).forEach(row => {
    let rowElement = tbody.insertRow();
    let i = 0;
    Object.keys(row).forEach(header => {
      let cell = rowElement.insertCell(i++);
      let cellData = row[header];
      cell.innerHTML = produceCellHTML(header, cellData)
    });
  })
}

function produceCellHTML(header, cellData) {
  let html = '';
  switch(header) {
    case 'visual':
      html = 
      `<div class="visual-info-container">
        <span class="bicycle-color"></span>
        <img class="bicycle-image" src="./resources/${cellData.imgName}" alt="">
        <span class="bicycle-text"${cellData.idText}</span>
      </div>
      <div class="image-popup">
        <img class="bicycle-image" src="./resources/red-schwinn" alt="">
      </div>`
      break;
    case 'status':
      html = 
      `<div class="status-container">
        <span class="status-indicator yGrad"></span>
        <span class="status">${cellData}</span>
      </div>`
      break;
    default:
      html = cellData;
    // case 'person':
    //   break;
    // case 'email':
    //   break;
    // case 'takenDate':
    //   break;
    // case 'maintainedDate':
    //   break;
    return html;
  }
}