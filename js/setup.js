'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;
var KEY_CODE_ESC = 27;
var KEY_CODE_ENTER = 13;

function renderDialog() {
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
  renderWizards();
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
}

function setWizardName() {
  return getRandomValue(WIZARD_NAMES) + ' ' + getRandomValue(WIZARD_SURNAME);
}

function getRandomValue(data) {
  return data[Math.floor(Math.random() * data.length)];
}

function generateWizard() {
  var wizard = {};
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizard.name = setWizardName();
    wizard.coatColor = getRandomValue(WIZARD_COAT_COLOR);
    wizard.eyesColor = getRandomValue(WIZARD_EYES_COLOR);
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

function renderWizards() {
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var wizards = generateWizards();
  wizards.forEach(function (wizard) {
    fragment.appendChild(getWizard(wizard));
  });
  similarListElement.appendChild(fragment);
}

renderDialog();

function setSetupModal() {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');

  function popUpClose() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydownHandler);
  }

  function popUpOpen() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydownHandler);
  }

  function onSetupOpenClickHandler() {
    popUpOpen();
  }

  function onSetupOpenKeydownHandler(evt) {
    if (evt.keyCode === KEY_CODE_ENTER) {
      popUpOpen();
    }
  }

  function onSetupCloseClickHandler() {
    popUpClose();
  }

  function onSetupCloseKeydownHandler(evt) {
    if (evt.keyCode === KEY_CODE_ENTER) {
      popUpClose();
    }
  }


  function onDocumentKeydownHandler(evt) {
    if (evt.keyCode === KEY_CODE_ESC && document.activeElement !== setupUserName) {
      popUpClose();
    }
  }

  setupOpen.addEventListener('click', onSetupOpenClickHandler);
  setupOpen.addEventListener('keydown', onSetupOpenKeydownHandler);
  setupClose.addEventListener('click', onSetupCloseClickHandler);
  setupClose.addEventListener('keydown', onSetupCloseKeydownHandler);
  document.addEventListener('keydown', onDocumentKeydownHandler);
}
setSetupModal();

function setSetupWizard() {
  var wizard = document.querySelector('.setup-wizard');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');

  function setColor(colors, element, name) {
    var currentColor = getRandomValue(colors);
    document.querySelector('input[name="' + name + '"]').value = currentColor;
    if (element.classList.value === 'setup-fireball-wrap') {
      element.style.backgroundColor = currentColor;
    } else {
      element.style.fill = currentColor;
    }
  }

  function onWizardCoatClickHandler() {
    setColor(WIZARD_COAT_COLOR, wizardCoat, 'coat-color');
  }

  function onFireballClickHandler() {
    setColor(WIZARD_FIREBALL_COLORS, fireball, 'fireball-color');
  }

  function onWizardEyesClickHandler() {
    setColor(WIZARD_EYES_COLOR, wizardEyes, 'eyes-color');
  }

  wizardCoat.addEventListener('click', onWizardCoatClickHandler);
  wizardEyes.addEventListener('click', onWizardEyesClickHandler);
  fireball.addEventListener('click', onFireballClickHandler);
}

setSetupWizard();
