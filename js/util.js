'use strict';
window.util = (function () {
  var setupUserName = document.querySelector('.setup-user-name');
  var KEY_CODE_ESC = 27;
  var KEY_CODE_ENTER = 13;

  return {
    isEnterKeydown: function (evt, action) {
      if (evt.keyCode === KEY_CODE_ENTER) {
        action();
      }
    },

    isEscKeyDown: function (evt, action) {
      if (evt.keyCode === KEY_CODE_ESC && document.activeElement !== setupUserName) {
        action();
      }
    },

    getRandomValue: function (data) {
      return data[Math.floor(Math.random() * data.length)];
    },

    setColor: function (colors, element, name) {
      var currentColor = this.getRandomValue(colors);
      document.querySelector('input[name="' + name + '"]').value = currentColor;
      if (element.classList.value === 'setup-fireball-wrap') {
        element.style.backgroundColor = currentColor;
      } else {
        element.style.fill = currentColor;
      }
    }
  };
})();
