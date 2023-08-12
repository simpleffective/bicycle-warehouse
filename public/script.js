
const TABLE_DATA_URL = '/get-table-data'

const tableData = fetch(TABLE_DATA_URL)
  .then( (response) => { 
    return response.text()
  })
  .then( (data) => {
    console.log(data)
  })