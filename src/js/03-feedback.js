/*
Завдання 3 - форма зворотного зв'язку
HTML містить розмітку форми. Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

<form class="feedback-form" autocomplete="off">
  <label>
    Email
    <input type="email" name="email" autofocus />
  </label>
  <label>
    Message
    <textarea name="message" rows="8"></textarea>
  </label>
  <button type="submit">Submit</button>
</form>

Виконуй це завдання у файлах 03-feedback.html і 03-feedback.js. Розбий його на декілька підзавдань:

1.Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
2.Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
3.Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
4.Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
*/

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
