import { EventEmitter } from 'stream';
import Pagination from './pagination.js'

export default function initTable() {
  const TABLE_DATA_URL = '/get-table-data'

  fetch(TABLE_DATA_URL)
  .then( (response) => response.json())
  .then( (data) => {
    fillTable(data)
  })
}

class Table {

  static #ROWS_PER_PAGE = 12;

  constructor(thead, tbody, pagination, data) {
    this.#tbody = tbody;
    this.#thead = thead;
    this.#rows = data;
    this.#displayedRows = data;

    this.#currentPage = 0;
    // this.pagination = new Pagination();
  }

  render() {
    this.renderHeader();
    this.renderRows();
    this.renderPagination();
  }

  rowsToRender() {
    start = (currentPage - 1) * ROWS_PER_PAGE
    end = start + ROWS_PER_PAGE
    return start, end
  }

  tableAction(filter) {
    this.displayedRows = this.rows.filter(filter);
    this.onRowsChanged();
  }

  onRowsChanged() {
    currentPage = 0;
    this.renderRows();
    this.renderPagination();
  }

  onPageChanged() {
    this.renderRows();
  }

  renderPagination() {
    // html
    // listeners
  }

  renderHeader() {

  }

  renderEmptyTable() {

  }

  renderRows() {
    if (this.displayedRows.length == 0) {
      this.renderEmptyTable();
      return;
    }
    [start, end] = this.rowsToRender();
    this.displayedRows.slice(start, end).forEach(row => {
      let rowElement = tbody.insertRow();
      let i = 0;
      Object.keys(row).forEach(header => {
        let cell = rowElement.insertCell(i++);
        let cellData = row[header];
        cell.innerHTML = produceCellHTML(header, cellData)
      });
    })
  }

  produceCellHTML(header, cellData) {
    switch(header) {
      case 'visual':
        break;
      case 'status':
        break;
      default:
        return cellData;
        break;
      // case 'person':
      //   break;
      // case 'email':
      //   break;
      // case 'takenDate':
      //   break;
      // case 'maintainedDate':
      //   break;
    }
  }

}