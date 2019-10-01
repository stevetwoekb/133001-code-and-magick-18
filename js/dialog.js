'use strict';
window.dialog = (function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var upload = setup.querySelector('.upload');
  var startCoords = {
    x: 0,
    y: 0
  };
  var dragged = false;

  function onSetupOpenClick() {
    popUpOpen();
  }

  function onSetupOpenKeydown(evt) {
    window.util.isEnterKeydown(evt, popUpOpen);
  }

  function onSetupCloseClick() {
    popUpClose();
  }

  function onSetupCloseKeydown(evt) {
    window.util.isEnterKeydown(evt, popUpClose);
  }

  function onDocumentKeydown(evt) {
    window.util.isEscKeyDown(evt, popUpClose);
  }

  function popUpClose() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  function popUpOpen() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
  }

  function renderDialog() {
    var userDialog = document.querySelector('.setup');
    userDialog.classList.remove('hidden');
    window.wizards.renderWizards();
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  }

  function onDocumentMouseMove(evt) {
    evt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  }

  function onUploadMouseUp(evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onUploadMouseUp);
  }

  function onClickPreventDefault(evt) {
    evt.preventDefault();
    upload.removeEventListener('click', onClickPreventDefault);
  }

  function onUploadMousedown(evt) {
    startCoords.x = evt.clientX;
    startCoords.y = evt.clientY;

    if (dragged) {
      onClickPreventDefault();
    }
    upload.addEventListener('click', onClickPreventDefault);
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onUploadMouseUp);
  }

  upload.addEventListener('mousedown', onUploadMousedown);
  setupOpen.addEventListener('click', onSetupOpenClick);
  setupOpen.addEventListener('keydown', onSetupOpenKeydown);
  setupClose.addEventListener('click', onSetupCloseClick);
  setupClose.addEventListener('keydown', onSetupCloseKeydown);
  document.addEventListener('keydown', onDocumentKeydown);
  renderDialog();
})();
