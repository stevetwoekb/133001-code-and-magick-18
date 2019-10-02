'use strict';

window.setup = (function () {
  var wizard = document.querySelector('.setup-wizard');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var getСoatColors = window.wizards.getCoatColors;
  var getfireballColors = window.wizards.getFireballColors;
  var getEyesColors = window.wizards.getEyeColors;
  var setColor = window.util.setColor;


  function onWizardCoatClick() {
    setColor(getСoatColors(), wizardCoat, 'coat-color');
  }

  function onFireballClick() {
    setColor(getfireballColors(), fireball, 'fireball-color');
  }

  function onWizardEyesClick() {
    setColor(getEyesColors(), wizardEyes, 'eyes-color');
  }

  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  fireball.addEventListener('click', onFireballClick);
})();
