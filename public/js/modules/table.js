import { init as initPagination } from './pagination.js'
import { init as initActions} from './table-actions.js'
export {
  renderTablePage,
  tableAction,
  init
}

const table = document.querySelector('table');
const tbody = table.querySelector('tbody');
const ROWS_PER_PAGE = 8;
let tableData;
let displayedTableData = [];

function init() {
  const TABLE_DATA_URL = '/get-table-data'
  
  fetch(TABLE_DATA_URL)
  .then( (response) => response.json())
  .then( (data) => {
    tableData = data;
    displayedTableData = [...tableData];
    resetTable()
    initActions()
  })
}

function resetTable() {
  initPagination(displayedTableData.length)
  renderTablePage(1);
}

function tableAction(action, actionArgs) {
  switch (action) {
    case "filter":
      displayedTableData = tableData.filter(row => actionArgs.values.includes(row[actionArgs.header]))
      break;
    default:
      break;
  }

  resetTable()
}

function renderEmptyTable() {
  tbody.innerHTML = '';
  // TODO nicer in the future
}

function renderTablePage(page) {
  
  if (displayedTableData.length == 0) {
    renderEmptyTable();
    return;
  }

  tbody.innerHTML = '';

  let start = (page - 1) * ROWS_PER_PAGE
  let end = start + ROWS_PER_PAGE
  displayedTableData.slice(start, end).forEach(row => {
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
        <img class="bicycle-image" src="${cellData.img_filename}" alt="">
        <span class="bicycle-text">${cellData.idText}</span>
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
  }
  return html;
}

