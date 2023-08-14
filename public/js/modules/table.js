
function produceHTML(columnName, items) {
  if (columnName === 'visual') {
    return `<div class="bicycle-visual-info">
    <img class="bicycle-image" src="./resources/${items.imgName}" alt="">
    <span class="bicycle-visual-info-bottom">
      <span class="bicycle-color"></span>
      <span class="bicycle-text">${items.idText}</span>
    </span>
  </div>`
  } else if (columnName === 'status') {
    return `  <div class="status-container">
      <span class="status-indicator"></span>
      ${items.status}
    </div>`
  }
}

function fillTable(tableData) {
  const tableBody = document.querySelector('.bicycle-table').querySelector('tbody')
  
  tableData.forEach(items => {
    let row = tableBody.insertRow();

    let visualInfoCell = row.insertCell(0);
    visualInfoCell.innerHTML = produceHTML('visual', items)

    let statusCell = row.insertCell(1);
    statusCell.innerHTML = produceHTML('status', items)

    let personCell = row.insertCell(2);
    personCell.innerHTML = items.person
    let emailCell = row.insertCell(3);
    emailCell.innerHTML = items.email
    let takenDateCell = row.insertCell(4);
    takenDateCell.innerHTML = items.takenDate
    let maintainedDateCell = row.insertCell(5);
    maintainedDateCell.innerHTML = items.maintainedDate
  });
}

export default function initTable() {
  const TABLE_DATA_URL = '/get-table-data'

  fetch(TABLE_DATA_URL)
  .then( (response) => response.json())
  .then( (data) => {
    fillTable(data)
  })
}