


export default class Pagination {
  static #ROWS_PER_PAGE = 12;

  constructor(table, numRows) {
    this.#table = table;
    this.#numRows = numRows;
    this.#currentPage = 0;
  }

  render() {

    this.attachListeners();
  }

  attachListeners() {
    
  }

  

  getRowsToDisplay() {
    return 
  }

  numOfPages() {
    return Math.ceil(numRows / ROWS_PER_PAGE);
  }

  onRowsChanged(numRows) {
    this.#currentPage = 0;
    this.setNumRows(numRows);
  }

  setNumRows(num) {
    this.#numRows = num;
  }

  setCurrentPage(num) {
    // check?
    this.#currentPage = num;
  }
  
  getCurrentPage() {
    return this.#currentPage;
  }
}