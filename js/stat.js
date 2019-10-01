'use strict';
window.stat = (function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var COLUMN_WIDTH = 40;
  var COLUMN_HEIGHT = 150;
  var COLUMN_GAP = 50;
  var FONT_HEIGHT = 20;
  var BASIC_X_POSITION = CLOUD_X + COLUMN_WIDTH;
  var BASIC_Y_POSITION = CLOUD_HEIGHT - FONT_HEIGHT;

  function renderCloud(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  }

  function renderText(ctx, x, y, messages) {
    ctx.font = '16px PT Mono';
    ctx.fillStyle = '#000';
    messages.forEach(function (message, index) {
      ctx.fillText(message, x, y + (FONT_HEIGHT * index));
    });
  }

  function getColor() {
    return 'hsl(240,' + Math.floor(Math.random() * 100) + '%, 50%)';
  }

  function getMaxElement(arr) {
    return Math.max.apply(null, arr);
  }

  window.renderStatistics = function (ctx, names, times) {
    var startFirstText = (COLUMN_GAP - GAP) - CLOUD_Y;
    var messages = ['Ура вы победили!', 'Список результатов:'];
    renderStatisticBoard(ctx, CLOUD_X, CLOUD_Y);
    renderMessage(ctx, BASIC_X_POSITION, startFirstText, messages);
    renderHistogram(ctx, names, times);
  };

  function renderStatisticBoard(ctx, x, y) {
    var boardColor = '#fff';
    var boardShadowColor = 'rgba(0, 0, 0, 0.3)';
    var shadowGapX = x + GAP;
    var shadowGapY = y + GAP;
    renderCloud(ctx, shadowGapX, shadowGapY, boardShadowColor);
    renderCloud(ctx, x, y, boardColor);
  }

  function renderMessage(ctx, x, y, messages) {
    renderText(ctx, x, y, messages);
  }

  function renderHist(ctx, color, columnHeight, left, bottom, name, time) {
    var userTimeTextY = bottom - columnHeight - GAP;
    var userNameTextY = bottom + FONT_HEIGHT;
    time = Math.round(time);
    renderText(ctx, left, userTimeTextY, [time], color);
    renderText(ctx, left, userNameTextY, [name], color);
    renderColumn(ctx, left, bottom, columnHeight, color);
  }

  function renderColumn(ctx, left, bottom, columnHeight, color) {
    ctx.fillStyle = color;
    ctx.fillRect(left, bottom - columnHeight, COLUMN_WIDTH, columnHeight);
  }

  function renderHistogram(ctx, names, times) {
    var playerColor = 'rgba(255, 0, 0, 1)';
    var maxTime = getMaxElement(times);
    names.forEach(function (name, i) {
      var enemyColor = getColor();
      var color = name === 'Вы' ? playerColor : enemyColor;
      var time = times[i];
      var currentColumnHeight = time / maxTime * COLUMN_HEIGHT;
      var currentColumnX = BASIC_X_POSITION + (i * (COLUMN_WIDTH + COLUMN_GAP));
      renderHist(ctx, color, currentColumnHeight, currentColumnX, BASIC_Y_POSITION, name, time);
    });
  }
})();
