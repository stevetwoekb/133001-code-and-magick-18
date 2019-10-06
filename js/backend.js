'use strict';
window.backend = (function () {
  var URL = 'https://js.dump.academy/code-and-magick/data';
  var URL_SAND = 'https://js.dump.academy/code-and-magick';

  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);

    function onLoadFunc() {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    }

    function onErrorFunc() {
      onError('Ошибка загрузки данных');
    }

    xhr.addEventListener('load', onLoadFunc);
    xhr.addEventListener('error', onErrorFunc);
    xhr.send();
  }

  function save(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', URL_SAND);
    onLoad(xhr.response);
    xhr.send(data);
    function onLoadFunc() {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    }

    function onErrorFunc() {
      onError('Ошибка загрузки данных');
    }
    xhr.addEventListener('load', onLoadFunc);
    xhr.addEventListener('error', onErrorFunc);
  }

  return {
    load: load,
    save: save,
  };
})();
