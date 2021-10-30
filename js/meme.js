'use strict';

var gCanvas;
var gCtx;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

const modal = document.querySelector('.modal');

function init() {
  gCanvas = document.querySelector('canvas');
  gCtx = gCanvas.getContext('2d');
  addMouseListeners();
  addTouchListeners();
  var images = getImgs();
  renderGallery(images);
  loadSavedMemesFromLocal();
  renderSaved();
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
  clearTextInput();
  resetMeme(memeId);
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

function onAddLine(txt) {
  addLine(txt);
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

function onChangeFont(font) {
  changeFont(font);
  drawMeme();
}

function onAddSticker(txt) {
  addSticker(txt);
  drawMeme();
}

function onDownloadMeme(elLink) {
  const data = gCanvas.toDataURL();
  elLink.href = data;
  elLink.download = 'MEME';
}

function onToggleMenu() {
  document.body.classList.toggle('menu-open');
}

function toggleModal() {
  document.body.classList.toggle('modal-open');
}

function addMouseListeners() {
  gCanvas.addEventListener('mousemove', onMove);
  gCanvas.addEventListener('mousedown', onDown);
  gCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
  gCanvas.addEventListener('touchmove', onMove);
  gCanvas.addEventListener('touchstart', onDown);
  gCanvas.addEventListener('touchend', onUp);
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

function onDown(ev) {
  const pos = getEvPos(ev);
  let idx = getSelectedLineIdx();
  if (!isLineClicked(pos, idx)) return;
  setLineDrag(true, idx);
  gStartPos = pos;
  document.querySelector('.meme-canvas').style.cursor = 'grabbing';
}

function onMove(ev) {
  if (!gMeme.lines.length) return;
  const line = getLine();
  if (line.isDrag) {
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;
    gStartPos = pos;
    moveLine(line, dx, dy);
    drawMeme();
  }
}

function onUp() {
  let idx = getSelectedLineIdx();
  setLineDrag(false, idx);
  document.querySelector('.meme-canvas').style.cursor = 'grab';
}

function onSetLang(lang) {
  setLang(lang);
  var elBody = document.querySelector('body');
  if (lang === 'he') {
    elBody.classList.add('rtl');
  } else {
    elBody.classList.remove('rtl');
  }
  doTrans();
}

function onSaveMeme() {
  saveMeme();
  renderSaved();
}

function renderSaved() {
  const savedMemes = getSavedMemes();
  console.log(savedMemes);
  const elSavedGallery = document.querySelector('.saved-gallery');
  if (!savedMemes || !savedMemes.length)
    return (elSavedGallery.innerHTML =
      '<h2 class="saved-empty-text">You have no saved memes</h2>');
  var strHTML = '';
  savedMemes.forEach((meme, idx) => {
    strHTML += `<article data-imgId="${idx}" class="saved-meme">
                  <img src="${meme.url}" alt class="saved-img">
                  <button class="download-meme-saved flex space-between " onclick="onDownloadMeme(${idx})">Download</button>
                  <button class=""remove-saved-btn flex space-between " onclick="onRemoveSaved(${idx})">Remove</button>
              </article>`;
  });
  document.querySelector('.saved-gallery').innerHTML = strHTML;
}

function onRemoveSaved(idx) {
  removeSaved(idx);
  renderSaved();
}
