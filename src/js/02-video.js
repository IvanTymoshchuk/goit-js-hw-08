/*
Завдання 2 - відеоплеєр
HTML містить <iframe> з відео для Vimeo плеєра. Напиши скрипт, який буде зберігати поточний час відтворення відео у локальне сховище і, після перезавантаження сторінки, продовжувати відтворювати відео з цього часу.

<iframe
  id="vimeo-player"
  src="https://player.vimeo.com/video/236203659"
  width="640"
  height="360"
  frameborder="0"
  allowfullscreen
  allow="autoplay; encrypted-media"
></iframe>

Виконуй це завдання у файлах 02-video.html і 02-video.js. Розбий його на декілька підзавдань:

1.Ознайомся з документацією бібліотеки Vimeo плеєра.
2.Додай бібліотеку як залежність проекту через npm.
3.Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player, але враховуй, що у тебе плеєр доданий як npm пакет, а не через CDN.
4.Вивчи документацію методу on() і почни відстежувати подію timeupdate - оновлення часу відтворення.
5.Зберігай час відтворення у локальне сховище. Нехай ключем для сховища буде рядок "videoplayer-current-time".
6.Під час перезавантаження сторінки скористайся методом setCurrentTime() з метою відновлення відтворення зі збереженої позиції.
7.Додай до проекту бібліотеку lodash.throttle і зроби так, щоб час відтворення оновлювався у сховищі не частіше, ніж раз на секунду.
*/


import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const TIME_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe, {
  loop: true,
  fullscreen: true,
  quality: '1080p',
});

const getCurrentTime = function (currentTime) {
  const seconds = currentTime.seconds;
  localStorage.setItem(TIME_KEY, JSON.stringify(seconds));
};

player.on('timeupdate', throttle(getCurrentTime, 1000));

player.setCurrentTime(JSON.parse(localStorage.getItem(TIME_KEY)) || 0);

// player
//   .setColor('#d8e0ff')
//   .then(function (color) {
//     console.log('The new color value: #76aef1');
//   })
//   .catch(function (error) {
//     console.log('An error occurred while setting the color');
//   });
