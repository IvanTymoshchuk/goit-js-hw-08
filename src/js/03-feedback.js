import '../css/common.css';
import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('input'),
};
const formData = {
  email: '',
  message: '',
};
populateTextarea();
refs.form.addEventListener('input', throttle(onTextareaInput, 500));
refs.form.addEventListener('submit', e => {
  e.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  console.log(formData);
});
function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;
  const stringifiedData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, stringifiedData);
}
function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage === null) {
    return;
  }

  refs.textarea.value = savedMessage.message || '';
  refs.input.value = savedMessage.email || '';
  formData.email = savedMessage.email || '';
  formData.message = savedMessage.message || '';
}


//* 2 Варіант

// const refs = {
//   form: document.querySelector('.feedback-form'),
//   email: document.querySelector('input'),
//   message: document.querySelector('textarea'),
// };

// refs.form.addEventListener('submit', onFormSubmit);
// refs.form.addEventListener('input', throttle(onFormInput, 500));

// const STORAGE_KEY = 'feedback-form-state';
// let formData = {
// email: '',
// message: '',
// };

// processingTheForm();

// function onFormSubmit(e) {
//   e.preventDefault();
// localStorage.removeItem(STORAGE_KEY);
//   formData.email = refs.email.value;
//   formData.message = refs.message.value;
//   e.currentTarget.reset();
// }

// function onFormInput(e) {
//   formData[e.target.name] = e.target.value;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
// }

// function processingTheForm() {
//   const formValues = localStorage.getItem(STORAGE_KEY);
//   const objectValues = JSON.parse(formValues);

// if (objectValues) {
//   formData = objectValues;
//   refs.email.value = objectValues.email || '';
//   refs.message.value = objectValues.message || '';
//   formData = objectValues.email || '';
//   formData = objectValues.message || '';
// }
