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
      // only rows that have a value which is in the Array actionArgs.values
      displayedTableData = tableData.filter(row => actionArgs.values.includes(row[actionArgs.header]))
      break;
    default:
      break;
  }

  resetTable()
}

function renderEmptyTable() {
  tbody.innerHTML = '';
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

function produceCellHTML(header, data) {
  let html = '';
  switch(header) {
    case 'visual':
      html = 
      `<div class="visual-info-container" style="
        background: url(${data.img_filename}) no-repeat;
        background-position: center;
        background-size: cover;">
        <span class="bicycle-text">${data.textId}</span>`
      break;
    case 'status':
      const status = statusMapping(data)
      html = 
      `<div class="status-container">
        <span class="status-indicator ${status.color}Grad"></span>
        <span class="status">${status.name}</span>
      </div>`
      break;
    default:  // person, email
      html = data;
  }
  return html;
}

function statusMapping(status) {
  switch(status) {
    case 'maintained':
      return {
        name: 'בטיפול',
        color: 'y'
      }
    case 'free':
      return {
        name: 'פנויות',
        color: 'g'
      }
    case 'done':
      return {
        name: 'שוחררו',
        color: 'r'
      }
  }
}
