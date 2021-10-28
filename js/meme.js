'use strict';

var gCanvas;
var gCtx;
var gStartPos;

function init() {
  gCanvas = document.querySelector('canvas');
  gCtx = gCanvas.getContext('2d');
  var images = getImgs();
  renderGallery(images);
  resetMeme();
  drawMeme();
}

function renderGallery(imgs) {
  var strHTML = '';
  imgs.map((img) => {
    strHTML += `<div data-imgId="${img.id}" class="meme" onclick="onMemeClicked(this)">
                  <img src="${img.url}" class="meme-img">
              </div>`;
  });
  document.querySelector('.img-gallery').innerHTML = strHTML;
}

function onSearchByName(search) {
  var inputVal = search.toLowerCase();
  var filteredImgs = filterByName(inputVal);
  renderGallery(filteredImgs);
}

function openSection(page) {
  const pageSections = document.querySelectorAll('.page-section');
  pageSections.forEach((section) => {
    section.classList.add('hidden');
  });
  var currPage = '.gallery-container';
  switch (page) {
    case 'editor':
      currPage = '.main-editor-container';
      break;
    case 'saved':
      currPage = '.saved-container';
      break;
  }
  document.querySelector(currPage).classList.remove('hidden');
}

function onMemeClicked(el) {
  var memeId = el.dataset.imgid;
  updateImgId(memeId);
  gMeme.lines[0].txt = 'make a meme';
  gMeme.lines.splice(1);
  clearTextInput();
  drawMeme();
  openSection('editor');
}

function drawMeme() {
  var memeImg = getImgUrl();
  var img = new Image();
  img.src = memeImg;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawLines();
    var url = gCanvas.toDataURL('image/png');
    updateDataUrl(url);
  };
}

function drawLines() {
  var lines = getLines();
  lines.forEach((line) => {
    drawLine(line);
  });
}

function drawLine(line) {
  var text = line.txt.toUpperCase();
  gCtx.font = `${line.size}px ${line.font}`;
  gCtx.lineWidth = 2;
  gCtx.fillStyle = line.fillColor;
  gCtx.strokeStyle = line.strokeColor;
  gCtx.textAlign = line.align;
  gCtx.fillText(text, line.pos.x, line.pos.y);
  gCtx.strokeText(text, line.pos.x, line.pos.y);
}

function onTextChange(el) {
  if (!getLinesNum()) addLine();
  const text = el.value;
  const idx = getSelectedLineIdx();
  gMeme.lines[idx].txt = text;
  drawMeme();
}

function onAddLine() {
  addLine();
  drawMeme();
  clearTextInput();
}

function clearTextInput() {
  document.querySelector('.meme-text-input').value = '';
}

function getTextInput() {
  let idx = getSelectedLineIdx();
  let text = gMeme.lines[idx].txt;
  return text;
}

function onRemoveLine() {
  const idx = getSelectedLineIdx();
  removeLine(idx);
  drawMeme();
}

function onSwitchLine() {
  switchLine();
  document.querySelector('.meme-text-input').value = getTextInput();
}

function onLineUp() {
  lineUp();
  drawMeme();
}

function onLineDown() {
  lineDown(gCanvas.width);
  drawMeme();
}

function onFontSizeUp() {
  fontSizeUp();
  drawMeme();
}

function onFontSizeDown() {
  fontSizeDown();
  drawMeme();
}

function onAlignText(direction) {
  alignText(direction, gCanvas.width);
  drawMeme();
}

function onChangeStroke(color) {
  changeStrokeColor(color);
  drawMeme();
}

function onChangeFill(color) {
  changeFillColor(color);
  drawMeme();
}

function onDownloadMeme(elLink) {
  const data = gCanvas.toDataURL();
  elLink.href = data;
  elLink.download = 'MEME';
}
