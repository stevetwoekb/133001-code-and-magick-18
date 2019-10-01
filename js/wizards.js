'use strict';
window.wizards = (function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_COUNT = 4;

  function setWizardName() {
    return window.util.getRandomValue(WIZARD_NAMES) + ' ' + window.util.getRandomValue(WIZARD_SURNAME);
  }

  function generateWizard() {
    var wizard = {};
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      wizard.name = setWizardName();
      wizard.coatColor = window.util.getRandomValue(WIZARD_COAT_COLOR);
      wizard.eyesColor = window.util.getRandomValue(WIZARD_EYES_COLOR);
    }
    return wizard;
  }

  function generateWizards() {
    var wizards = [];
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      wizards.push(generateWizard());
    }
    return wizards;
  }

  function getWizard(wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.coatColor;
    return wizardElement;
  }

  return {
    getCoatColors: function () {
      return WIZARD_COAT_COLOR;
    },
    getEyeColors: function () {
      return WIZARD_EYES_COLOR;
    },
    getFireballColors: function () {
      return WIZARD_FIREBALL_COLORS;
    },
    renderWizards: function () {
      var similarListElement = document.querySelector('.setup-similar-list');
      var fragment = document.createDocumentFragment();
      var wizards = generateWizards();
      wizards.forEach(function (wizard) {
        fragment.appendChild(getWizard(wizard));
      });
      similarListElement.appendChild(fragment);
    }
  };
})();
