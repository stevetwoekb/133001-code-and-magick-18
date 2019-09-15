'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var COLUMN_WIDTH = 40;
var COLUMN_HEIGHT = 150;
var COLUMN_GAP = 50;
var BASIC_FONT_COLOR = '#000';
var BASIC_X_POSITION = CLOUD_X + COLUMN_WIDTH;
var BASIC_FONT_SIZE = '16px';
var BASIC_FONT_STYLE = ' PT Mono';
var FONT_HEIGHT = 22;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function renderText(ctx, x, y, name) {
  ctx.font = BASIC_FONT_SIZE + BASIC_FONT_STYLE;
  ctx.fillStyle = BASIC_FONT_COLOR;
  ctx.fillText(name, x, y);
}

function getRandomColor() {
  return 'hsl(234, 97%,' + Math.floor(Math.random() * Math.floor(100)) + '%)';
}

function getPlayersGraph(ctx, x, y, name, cutValue) {
  var graphic = true;
  var roundCutValue = Math.round(cutValue);
  ctx.fillStyle = getRandomColor();
  ctx.fillRect(x, y, COLUMN_WIDTH, COLUMN_HEIGHT);

  if (name === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    ctx.fillRect(x, y, COLUMN_WIDTH, COLUMN_HEIGHT);
  }

  if (graphic) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, COLUMN_WIDTH, COLUMN_HEIGHT - roundCutValue);
  }
}

function getMaxElement(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
}

function clear() {
  BASIC_X_POSITION = CLOUD_X + COLUMN_WIDTH;
}

window.renderStatistics = function (ctx, names, times) {
  clear();
  var topTextGap = (COLUMN_GAP - (GAP * 2)) + FONT_HEIGHT;
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderText(ctx, BASIC_X_POSITION, (COLUMN_GAP - GAP) - CLOUD_Y, 'Ура вы победили!');
  renderText(ctx, BASIC_X_POSITION, topTextGap, 'Список результатов:');
  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    renderText(ctx, BASIC_X_POSITION, CLOUD_HEIGHT - GAP, names[i]);
    getPlayersGraph(ctx, BASIC_X_POSITION, (COLUMN_GAP - CLOUD_Y + FONT_HEIGHT) + 20, names[i], (COLUMN_HEIGHT * times[i]) / maxTime);
    BASIC_X_POSITION += (COLUMN_GAP + COLUMN_GAP);
  }

  clear();
  for (var j = 0; j < times.length; j++) {
    var roundTextPoistion = Math.round(COLUMN_HEIGHT - (COLUMN_HEIGHT * times[j]) / maxTime);
    var customValue = (CLOUD_Y + GAP) + topTextGap;
    var result = customValue + roundTextPoistion;
    var rounValue = Math.round(times[j]);
    renderText(ctx, BASIC_X_POSITION, result, rounValue);
    BASIC_X_POSITION += (COLUMN_GAP + COLUMN_GAP);
  }
};


