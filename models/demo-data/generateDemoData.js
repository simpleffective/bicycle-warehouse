const fs = require('fs')
const path = require('path')
const { randomDate, formatDate } = require('../../util');
const { log } = require('console');

const numUsers = 50;
const dbPath = `C:\\Users\\orenp\\Documents\\Projects\\bicycle-warehouse\\models\\demo-data\\demo-live.json`

module.exports = {init}

async function init() {
  let users;
  await fetch(`https://randomuser.me/api/?results=${numUsers}}`)
    .then(res => res.json())
    .then(data => users = data.results)
  
  const rows = await createRows(users)
  fs.writeFileSync(dbPath, rows.map(row => JSON.stringify(row)).join(',\n') + ',');
}

async function createRows(users) {
  
  const rows = []
  for (let i=0 ; i < users.length; i++) {
    let user = users[i]
    let img_filename = randomBikeImg()
    let [person, email] = [`${user.name.first} ${user.name.last}`, user.email]
    let textId = `${person}'s Bike`
    let status = randomStatus()
    let takenDate = ['maintained', 'done'].includes(status) ? 
                    randomDate(new Date(2023,5,3), new Date()) :
                    null;
    let maintainedDate = takenDate? randomDate(takenDate, new Date()) : null;

    rows.push(fillTemplate(
      img_filename,
      textId,
      status,
      person,
      email,
      takenDate? formatDate(takenDate) : `&#8212`,
      maintainedDate? formatDate(maintainedDate) : `&#8212`
    ))
  }
  return rows;
}

const randomStatus = (function() {
  const statuses = ['free', 'maintained', 'done']
  return function() {
    return statuses[Math.floor(Math.random() * statuses.length)]
  }
})();

const randomBikeImg = (function () {
  const folderPath = path.join(process.env.ROOT, `\\public\\resources\\bicycle-images`)
  const files = fs.readdirSync(folderPath)
  return function () {
    const randomFile = files[Math.floor(Math.random() * files.length)];
    return path.join(`\\public\\resources\\bicycle-images\\`, randomFile)
  }
})();


function fillTemplate(img_filename, textId, status, person, email, takenDate, maintainedDate) { 
  return {
    visual:{
        img_filename: img_filename,
        textId: textId
      },
    status: status,
    person: person,
    email: `${email.split('@')[0]}&#8203@${email.split('@')[1]}`,
    takenDate: takenDate,
    maintainedDate: maintainedDate
  }
}


