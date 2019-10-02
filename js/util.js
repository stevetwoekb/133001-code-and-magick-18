'use strict';
window.util = (function () {
  var setupUserName = document.querySelector('.setup-user-name');
  var KEY_CODE_ESC = 27;
  var KEY_CODE_ENTER = 13;

  function getRandomValue(data) {
    return data[Math.floor(Math.random() * data.length)];
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
    isEscKeyDown: isEscKeyDown
  };
})();
