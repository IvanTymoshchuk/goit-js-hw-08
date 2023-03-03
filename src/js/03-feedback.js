import '../css/common.css';
import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('input'),
};
const formData = {};

populateTextarea();

refs.form.addEventListener('input', throttle(onTextareaInput, 500));

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  e.currentTarget.reset();
  const objData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  localStorage.removeItem(STORAGE_KEY);
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
  refs.textarea.value = savedMessage['message'] || '';
  refs.input.value = savedMessage['email'] || '';
}





//* 2 варіант 
// const form = document.querySelector('.feedback-form');
// const emailInput = form.querySelector('input[name="email"]');
// const messageInput = form.querySelector('textarea[name="message"]');
// const localStorageKey = 'feedback-form-state';

//  refs.form.addEventListener('input', throttle(onTextareaInput, 500));

// // Зберігає значення полів у локальне сховище
// function saveFormState() {
//   const formState = {
//     email: emailInput.value,
//     message: messageInput.value
//   };
//   localStorage.setItem(localStorageKey, JSON.stringify(formState));
// }

// // Заповнює поля форми збереженими значеннями
// function fillFormFromState() {
//   const formState = JSON.parse(localStorage.getItem(localStorageKey));
//   if (formState) {
//     emailInput.value = formState.email;
//     messageInput.value = formState.message;
//   }
// }

// // Очищує локальне сховище і поля форми при надсиланні форми
// form.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const formState = {
//     email: emailInput.value,
//     message: messageInput.value
//   };
//   localStorage.removeItem(localStorageKey);
//   emailInput.value = '';
//   messageInput.value = '';
// })