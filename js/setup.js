'use strict';
var KEY_CODE_ESC = 27;
var KEY_CODE_ENTER = 13;
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', '  rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var popUp = document.querySelector('.setup');
var openPopUpButton = document.querySelector('.setup-open');
var closePopUpButton = popUp.querySelector('.setup-close');
var inputCharName = popUp.querySelector('.setup-user-name');
var wizard = document.querySelector('.setup-wizard');
var wizardCoat = wizard.querySelector('.wizard-coat');
var wizardEyes = wizard.querySelector('.wizard-eyes');
var fireball = popUp.querySelector('.setup-fireball-wrap');

function userClickHandler() {
  popUp.classList.remove('hidden');
}

function userKeydownHandler(evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    popUp.classList.remove('hidden');
  }
}

function wizardCoatClickHandler() {
  wizardCoat.style.fill = getRandomeElement(WIZARD_COAT_COLORS);
}

function fireballClickHandler() {
  fireball.style.background = getRandomeElement(WIZARD_FIREBALL_COLORS);
}

function wizardEyesClickHandler() {
  wizardEyes.style.fill = getRandomeElement(WIZARD_EYES_COLORS);
}


function crossClickHandler() {
  popUp.classList.add('hidden');
}

function crossKeydownHandler(evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    popUp.classList.add('hidden');
  }
}

function popUpKeydownHandler(evt) {
  if (document.activeElement === inputCharName) {
    return;
  }
  if (evt.keyCode === KEY_CODE_ESC) {
    popUp.classList.add('hidden');
  }
}

function getRandomeElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

getRandomeElement(WIZARD_COAT_COLORS);

openPopUpButton.addEventListener('click', userClickHandler);
openPopUpButton.addEventListener('keydown', userKeydownHandler);
closePopUpButton.addEventListener('click', crossClickHandler);
closePopUpButton.addEventListener('keydown', crossKeydownHandler);
document.addEventListener('keydown', popUpKeydownHandler);
wizardCoat.addEventListener('click', wizardCoatClickHandler);
wizardEyes.addEventListener('click', wizardEyesClickHandler);
fireball.addEventListener('click', fireballClickHandler);
