'use strict';
window.util = (function () {
  var KEY_CODE_ESC = 27;
  var KEY_CODE_ENTER = 13;
  var setupUserName = document.querySelector('.setup-user-name');

  function getRandomValue(data) {
    return data[Math.floor(Math.random() * data.length)];
  }

  function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function shuffleArray(array) {
    var newArray = array.slice();
    for (var i = newArray.length - 1; i > 0; i--) {
      var j = getRandomNumberInRange(0, newArray.length);
      var temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    return newArray;
  }

  function getArrayWithRandomLength(array) {
    return shuffleArray(array).slice(0, getRandomNumberInRange(0, array.length));
  }

  function setColor(colors, element, name) {
    var currentColor = getRandomValue(colors);
    document.querySelector('input[name="' + name + '"]').value = currentColor;
    if (element.classList.value === 'setup-fireball-wrap') {
      element.style.backgroundColor = currentColor;
    } else {
      element.style.fill = currentColor;
    }
  }

  function isEnterKeydown(evt, action) {
    if (evt.keyCode === KEY_CODE_ENTER) {
      action();
    }
  }

  function isEscKeyDown(evt, action) {
    if (evt.keyCode === KEY_CODE_ESC && document.activeElement !== setupUserName) {
      action();
    }
  }

  return {
    getRandomValue: getRandomValue,
    setColor: setColor,
    isEnterKeydown: isEnterKeydown,
    isEscKeyDown: isEscKeyDown,
    getArrayWithRandomLength: getArrayWithRandomLength,
  };
})();
