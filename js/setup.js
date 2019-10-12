'use strict';

window.setup = (function () {
  var getСoatColors = window.wizards.getCoatColors;
  var getfireballColors = window.wizards.getFireballColors;
  var getEyesColors = window.wizards.getEyeColors;
  var render = window.wizards.render;
  var setColor = window.util.setColor;
  var debounce = window.debounce.debounce;
  var wizard = document.querySelector('.setup-wizard');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');

  function setListeners(array) {
    function onWizardCoatClick() {
      setColor(getСoatColors(), wizardCoat, 'coat-color');
      var debouncedRender = debounce(render);
      debouncedRender(array);
    }

    function onFireballClick() {
      setColor(getfireballColors(), fireball, 'fireball-color');
    }
    function onWizardEyesClick() {
      setColor(getEyesColors(), wizardEyes, 'eyes-color');
      debounce(render(array));
    }

    wizardCoat.addEventListener('click', onWizardCoatClick);
    wizardEyes.addEventListener('click', onWizardEyesClick);
    fireball.addEventListener('click', onFireballClick);

  }
  return {
    setListeners: setListeners,
  };
})();
