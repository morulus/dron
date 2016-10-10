import getRandomInt from './getRandomInt';

export default function randomizeContent(element) {
  setInterval(function() {
    element.innerHTML = String.fromCharCode(getRandomInt(40, 4000));
  }, 100);

  
}
