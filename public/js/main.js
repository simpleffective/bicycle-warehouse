import {init as initTable} from './modules/table.js'
import { init as initForm } from './modules/form.js'

function init() {
  initForm()
  initTable()
}

init()