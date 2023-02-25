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
