
function initFormSubmission(form) {
  form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  let URL = event.target.action
  let method = event.target.method
  
  fetch(URL, {
    method: method,
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: {
        'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(data => {
        console.log(data.message);
    });
  });
}

export const form = document.getElementById('bicycle-form')

export function initForm(){
  initFormSubmission(form)
} 