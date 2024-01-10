function clearFields() {
  const formElements = document.querySelectorAll('input');
  const textArea = document.querySelector('textarea');
  for (let index = 0; index < formElements.length; index += 1) {
    const userInput = formElements[index];
    if (formElements[index].type === 'radio' || formElements[index].type === 'checkbox') {
      userInput.checked = false;
    } else {
      userInput.value = '';
    }
  }
  textArea.value = '';
}

function enableSubmit() {
  const submitBtn = document.querySelector('#submit-btn');
  const agreement = document.querySelector('#agreement');
  submitBtn.disabled = !agreement.checked;
}

window.onload = function () {
  const clearBtn = document.querySelector('#clear-btn');
  clearBtn.addEventListener('click', clearFields);
  const agreement = document.querySelector('#agreement');
  agreement.addEventListener('change', enableSubmit);
};
