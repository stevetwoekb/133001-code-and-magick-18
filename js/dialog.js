'use strict';
window.dialog = (function () {
  var isEnterKeydown = window.util.isEnterKeydown;
  var isEscKeyDown = window.util.isEscKeyDown;
  var render = window.wizards.render;
  var load = window.backend.load;
  var save = window.backend.save;
  var setListeners = window.setup.setListeners;
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var form = setup.querySelector('.setup-wizard-form');
  var upload = setup.querySelector('.upload');
  var wizardsArray;
  var startCoords = {
    x: 0,
    y: 0
  };
  var dragged = false;

  function onSetupOpenClick() {
    popUpOpen();
  }

  function onSetupOpenKeydown(evt) {
    isEnterKeydown(evt, popUpOpen);
  }

  function onSetupCloseClick() {
    popUpClose();
  }

  function onSetupCloseKeydown(evt) {
    isEnterKeydown(evt, popUpClose);
  }

  function onDocumentKeydown(evt) {
    isEscKeyDown(evt, popUpClose);
  }

  function popUpClose() {
    setup.classList.add('hidden');
    setup.removeAttribute('style');
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  function popUpOpen() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
  }

  function showMessage(message) {
    var errorElement = document.createElement('div');
    errorElement.textContent = 'Ошибка ' + message + ' пожалуйста, обратитесь к администратору';
    errorElement.classList.add('error-message');
    document.body.insertBefore(errorElement, setup);

    function hideMessage() {
      errorElement.remove();
    }

    setTimeout(hideMessage, 4000);
  }

  function renderDialog() {
    var userDialog = document.querySelector('.setup');
    userDialog.classList.remove('hidden');
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
    function onLoad(wizards) {
      wizardsArray = wizards;
      setListeners(wizards);
      render(wizards);
    }
    function onError(error) {
      showMessage(error);
    }
    load(onLoad, onError);
  }

  function onDocumentMouseMove(evt) {
    evt.preventDefault();

    var shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };

    if (shift.x && shift.y) {
      dragged = true;
    }

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

    if (dragged) {
      upload.addEventListener('click', onClickPreventDefault);
    }
    dragged = false;
  }

  function onClickPreventDefault(evt) {
    evt.preventDefault();
    upload.removeEventListener('click', onClickPreventDefault);
  }

  function onSubmitForm(evt) {
    var data = new FormData(form);
    save(data, onSuccess, onError);
    function onSuccess() {
      setup.classList.add('hidden');
    }

    function onError(error) {
      showMessage(error);
    }
    evt.preventDefault();
  }

  function onUploadMousedown(evt) {
    startCoords.x = evt.clientX;
    startCoords.y = evt.clientY;
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onUploadMouseUp);
  }

  form.addEventListener('submit', onSubmitForm);
  upload.addEventListener('mousedown', onUploadMousedown);
  setupOpen.addEventListener('click', onSetupOpenClick);
  setupOpen.addEventListener('keydown', onSetupOpenKeydown);
  setupClose.addEventListener('click', onSetupCloseClick);
  setupClose.addEventListener('keydown', onSetupCloseKeydown);
  document.addEventListener('keydown', onDocumentKeydown);
  renderDialog();

  return {
    wizardsArray: wizardsArray
  };
})();
