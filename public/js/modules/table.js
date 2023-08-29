import { init as initPagination } from './pagination.js'
export {
  renderTablePage,
  init
}

const table = document.querySelector('table');
const tbody = table.querySelector('tbody');
const ROWS_PER_PAGE = 12;
let tableData = null;

function init() {
  const TABLE_DATA_URL = '/get-table-data'
  initActions();
  return
  fetch(TABLE_DATA_URL)
  .then( (response) => response.json())
  .then( (data) => {
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

  tbody.innerHTML = '';

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

function initActions() {
  const thead = table.querySelector('thead');
  const toggle_buttons = thead.querySelectorAll('.toggle-table-action')
  .forEach(button => {
    const th = button.closest('th')   // get parent th
    th.addEventListener('click', event => onHeaderClick(event, th))
  })
  };

function onHeaderClick(event, th) {
  // handle event if the button fired it
  if (event.target === th.querySelector('span button')) {
    if (th.dataset.name == 'person') {
      // display user search bar
      let search_bar = document.querySelector('.search-user');
      search_bar.style.display = search_bar.style.display === 'none' ? 'block' : 'none';
      search_bar.querySelector('input').focus();
    }
  }
}