
const TABLE_DATA_URL = '/get-table-data'

const tableData = fetch(TABLE_DATA_URL)
  .then( (response) => { 
    return response.json()
  })
  .then( (data) => {
    console.log(data)
  })