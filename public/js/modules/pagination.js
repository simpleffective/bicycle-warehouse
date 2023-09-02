
import { renderTablePage } from './table.js'
export {
  init
}

const ROWS_PER_PAGE = 8;
let currentPage = 1;  // initial page
const numbers = document.getElementById('pagination-numbers-container');
// const paginationLength = numbers.querySelectorAll('button').length
const paginationLength = 5;
const prev = document.getElementById('prev')
const next = document.getElementById('next')
let numPages = 0;

function init(numRows) {
  
  numPages = Math.ceil(numRows / ROWS_PER_PAGE);
  
  prev.addEventListener('click', onPageRequest)
  next.addEventListener('click', onPageRequest)

  drawNumberButtons()
}

function drawNumberButtons() {
  
  numbers.innerHTML = '';
  // let start = Math.max(1, currentPage - Math.floor(paginationLength / 2));
  // let end = Math.min(numPages, start + paginationLength - 1);

  let start = currentPage - Math.floor(paginationLength / 2);
  let end = currentPage + Math.floor(paginationLength / 2);
  if (start <= 0)
    end += 1 - start
  if (end > numPages)
    start -= end - numPages
  start = Math.max(start, 1)
  end = Math.min(end, numPages)

  for (let i = start ; i <= end ; i++) {
    let button = document.createElement('button');
    button.value = button.textContent = i;
    button.addEventListener('click', onPageRequest);
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