'use strict';

window.setup = (function () {
  function setSetupWizard() {
    var wizard = document.querySelector('.setup-wizard');
    var wizardCoat = wizard.querySelector('.wizard-coat');
    var wizardEyes = wizard.querySelector('.wizard-eyes');
    var fireball = document.querySelector('.setup-fireball-wrap');
    var coatColors = window.wizards.getCoatColors();
    var fireballColors = window.wizards.getFireballColors();
    var eyesColors = window.wizards.getEyeColors();

    function onWizardCoatClick() {
      window.util.setColor(coatColors, wizardCoat, 'coat-color');
    }

    function onFireballClick() {
      window.util.setColor(fireballColors, fireball, 'fireball-color');
    }

    function onWizardEyesClick() {
      window.util.setColor(eyesColors, wizardEyes, 'eyes-color');
    }

    wizardCoat.addEventListener('click', onWizardCoatClick);
    wizardEyes.addEventListener('click', onWizardEyesClick);
    fireball.addEventListener('click', onFireballClick);
  }
  setSetupWizard();
})();
