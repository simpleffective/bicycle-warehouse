
import { renderTablePage } from './table.js'
export {
  init
}

const ROWS_PER_PAGE = 12;
let currentPage = 1;  // initial page
const numbers = document.getElementById('pagination-numbers-container');
// const paginationLength = numbers.querySelectorAll('button').length
const paginationLength = 2;
const prev = document.getElementById('prev')
const next = document.getElementById('next')
let prevButton = null;
let currButton = null;
let numRows = 0;
let numPages = 0;

function init(numRows) {

  numRows = numRows;
  numPages = Math.ceil(numRows / ROWS_PER_PAGE);
  
  prev.addEventListener('click', onPageRequest)
  next.addEventListener('click', onPageRequest)

  drawNumberButtons()
}

function drawNumberButtons() {
  numbers.innerHTML = '';
  let firstButton = Math.min(Math.max(1, currentPage - 2), numRows - 4)
  for (let i = firstButton ; i < firstButton + Math.min(numPages, paginationLength) ; i++) {
    let button = document.createElement('button');
    button.value = button.textContent = i;
    button.addEventListener('click', onPageRequest);
    button.classList.add('pagination-button')
    if (i === currentPage)
      button.classList.add('current-page-button')
    numbers.appendChild(button);
  }
}

function onPageRequest(evt) {

  let page = evt.target.value;
  if (page === '<')
    page = currentPage - 1;
  else if (page === '>')
    page = currentPage + 1

  page = parseInt(page);
  if (page === currentPage || numPages < page || page < 1)
    return

  currentPage = page;

  // notify table
  renderTablePage(currentPage);

  // re-draw number buttons
  drawNumberButtons();
}