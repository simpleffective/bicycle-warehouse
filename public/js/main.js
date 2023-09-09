import {init as initTable} from './modules/table.js'
import { init as initForm } from './modules/form.js'
export {notifyEntry}

function init() {
  initForm()
  initTable()
}

init()


function notifyEntry() {
  initTable()
}
