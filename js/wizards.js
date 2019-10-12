'use strict';
window.wizards = (function () {
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_COUNT = 4;
  function getWizard(wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  }

  function getCoatColors() {
    return WIZARD_COAT_COLOR;
  }

  function getFireballColors() {
    return WIZARD_FIREBALL_COLORS;
  }

  function getEyeColors() {
    return WIZARD_EYES_COLOR;
  }

  var getRank = function (wizard) {
    var coatColor = document.querySelector('[name="coat-color"]').value;
    var eyesColor = document.querySelector('[name="eyes-color"]').value;
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  function renderWizards(wizards) {
    var similarListElement = document.querySelector('.setup-similar-list');
    similarListElement.innerHTML = '';
    var fragment = document.createDocumentFragment();
    wizards.sort(function (left, right) {
      return getRank(right) - getRank(left);
    }).slice(0, WIZARDS_COUNT).forEach(function (element) {
      fragment.appendChild(getWizard(element));
    });
    similarListElement.appendChild(fragment);
  }

  return {
    getCoatColors: getCoatColors,
    getFireballColors: getFireballColors,
    getEyeColors: getEyeColors,
    render: renderWizards
  };
})();
