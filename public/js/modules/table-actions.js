
import { tableAction } from './table.js'

var checkboxFocused = false;

export function init() {
  const thead = document.querySelector('table').querySelector('thead');
  thead.querySelectorAll('.toggle-table-action')
  .forEach(button => {
    // get the header (button's parent th), focus element and input elements
    const th = button.closest('th')
    const action_focus = th.querySelector('.table-action-focus')
    const action_inputs = th.querySelectorAll('.table-action-input')
    // set click and focusout handlers on the header and its action
    th.addEventListener('click', event => expandHeader(event, th))
    action_focus.addEventListener('focusout', event => contractHeader(event, th));
    // mitigation for checkbox taking containing div's focus  
    if (th.dataset.name == 'status') {
      action_inputs.forEach(checkbox => checkbox.addEventListener('click', () => checkboxFocused = true))
      action_inputs.forEach(checkbox => checkbox.addEventListener('focusout', () => checkboxFocused = false))
    }
    
    // assign input change event on input elements
    action_inputs.forEach(inputElement => inputElement.oninput = getInputHandler(th, inputElement))
    })
};


function getInputHandler(th, inputElement) {
  const header = th.dataset.name;
  switch (header) {
    case 'person':
      return function () {
        tableAction("filter", {
        "header": header,
        "values": [inputElement.value]
        })
      }

    case 'status':
      return function () {
        tableAction(
          "filter", {
          "header": header,
          "values":[...th.querySelectorAll('.table-action-input')]
                    .filter(checkbox => checkbox.checked)
                    .map(checkbox => checkbox.value)
        })
      }

    default:
      return null
  }
}

function expandHeader(event, th) {
  // handle event if the button fired it
  if (event.target === th.querySelector('.toggle-table-action')) {
    th.classList.toggle('expand');
    th.querySelector('.table-action-focus').focus();
  }
}

function contractHeader(event, th) {
  setTimeout( () => {
    if (checkboxFocused == false)
      th.classList.remove('expand');
  }, 100);
}