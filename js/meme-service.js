'use strict';
const KEY_MEME = 'meme';
var gMeme;
var gSavedMemes = [];

const gImages = [
  {
    id: 1,
    url: 'img/meme/1.jpg',
    keywords: ['funny', 'politic', 'trump', 'president'],
  },
  {
    id: 2,
    url: 'img/meme/2.jpg',
    keywords: ['happy', 'love', 'dog', 'animal'],
  },
  {
    id: 3,
    url: 'img/meme/3.jpg',
    keywords: ['baby', 'dog', 'animal'],
  },
  { id: 4, url: 'img/meme/4.jpg', keywords: ['cat', 'animal'] },
  {
    id: 5,
    url: 'img/meme/5.jpg',
    keywords: ['success', 'baby', 'excited'],
  },
  { id: 6, url: 'img/meme/6.jpg', keywords: ['man', 'genius'] },
  { id: 7, url: 'img/meme/7.jpg', keywords: ['baby', 'suprised', 'excited'] },
  {
    id: 8,
    url: 'img/meme/8.jpg',
    keywords: ['man', 'willy', 'wonka', 'gene'],
  },
  {
    id: 9,
    url: 'img/meme/9.jpg',
    keywords: ['baby', 'success', 'laugh'],
  },
  {
    id: 10,
    url: 'img/meme/10.jpg',
    keywords: ['politic', 'obama', 'laugh', 'president'],
  },
  {
    id: 11,
    url: 'img/meme/11.jpg',
    keywords: ['fight', 'boxing', 'kiss'],
  },
  { id: 12, url: 'img/meme/12.jpg', keywords: ['haim', 'man', 'zadik'] },
  {
    id: 13,
    url: 'img/meme/13.jpg',
    keywords: ['man', 'dicaprio', 'great', 'gatsby'],
  },
  {
    id: 14,
    url: 'img/meme/14.jpg',
    keywords: ['man', 'morpheus', 'matrix'],
  },
  {
    id: 15,
    url: 'img/meme/15.jpg',
    keywords: ['man', 'lord', 'ring', 'boromir', 'zero'],
  },
  {
    id: 16,
    url: 'img/meme/16.jpg',
    keywords: ['man', 'laugh', 'pickard', 'star trek'],
  },
  {
    id: 17,
    url: 'img/meme/17.jpg',
    keywords: ['man', 'politic', 'putin', 'president'],
  },
  {
    id: 18,
    url: 'img/meme/18.jpg',
    keywords: ['happy', 'buzz', 'story', 'toy'],
  },
];

function getImgs() {
  return gImages;
}

function updateImgId(imgId) {
  gMeme.selectedImgId = +imgId;
}

function getImgUrl() {
  if (isUploadImg) return gUploadImg.src;
  var imgId = +gMeme.selectedImgId;
  var img = gImages.find(({ id }) => id === imgId);
  return img.url;
}

function updateDataUrl(newUrl) {
  gMeme.dataUrl = newUrl;
}

function getLines() {
  return gMeme.lines;
}

function resetMeme(memeId = 1) {
  gMeme = {
    selectedImgId: memeId,
    selectedLineIdx: 0,
    dataUrl: undefined,
    lines: [
      {
        txt: 'Meme here',
        size: 40,
        align: 'center',
        strokeColor: '#000000',
        fillColor: '#ffffff',
        font: 'Impact',
        isDrag: false,
        pos: {
          x: 225,
          y: 50,
        },
      },
    ],
  };
}

function filterByName(inputVal) {
  const filteredImages = gImages.filter((img) => {
    let keyWords = img.keywords.filter((keyword) => {
      return keyword.toLowerCase().startsWith(inputVal);
    });
    if (keyWords.length) return true;
  });
  return filteredImages;
}

function getSelectedLineIdx() {
  return gMeme.selectedLineIdx;
}

function getLinesNum() {
  return gMeme.lines.length;
}

function addLine(txt) {
  const newLine = _createLine(txt);
  gMeme.lines.push(newLine);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function removeLine(idx) {
  gMeme.lines.splice(idx, 1);
  gMeme.selectedLineIdx = 0;
}

function switchLine() {
  let idx = getSelectedLineIdx();
  let linesNum = getLinesNum();
  idx = idx === linesNum - 1 ? 0 : ++idx;
  gMeme.selectedLineIdx = idx;
}

function _createLine(txt = 'Add text here') {
  return {
    txt,
    size: 40,
    align: 'center',
    strokeColor: '#000000',
    fillColor: '#ffffff',
    font: 'Impact',
    isDrag: false,
    pos: {
      x: 225,
      y: getRandomInt(40, 450),
    },
  };
}

function lineUp() {
  let idx = getSelectedLineIdx();
  if (!gMeme.lines[idx].pos.y) return;
  gMeme.lines[idx].pos.y += -5;
}

function lineDown(canvasWidth) {
  let idx = getSelectedLineIdx();
  if (gMeme.lines[idx].pos.y > canvasWidth) return;
  gMeme.lines[idx].pos.y += 5;
}

function fontSizeUp() {
  let idx = getSelectedLineIdx();
  gMeme.lines[idx].size += 5;
}

function fontSizeDown() {
  let idx = getSelectedLineIdx();
  gMeme.lines[idx].size += -5;
}

function alignText(direction, canvasWidth) {
  let posX;
  switch (direction) {
    case 'left':
      posX = 10;
      break;
    case 'center':
      posX = canvasWidth / 2;
      break;
    case 'right':
      posX = canvasWidth;
      break;

    default:
      break;
  }
  let idx = getSelectedLineIdx();
  gMeme.lines[idx].align = direction;
  gMeme.lines[idx].pos.x = posX;
}

function changeFillColor(color) {
  let idx = getSelectedLineIdx();
  gMeme.lines[idx].fillColor = color;
}

function changeStrokeColor(color) {
  let idx = getSelectedLineIdx();
  gMeme.lines[idx].strokeColor = color;
}

function changeFont(newFont) {
  const idx = getSelectedLineIdx();
  gMeme.lines[idx].font = newFont;
}

function setLineDrag(isDrag, idx) {
  gMeme.lines[idx].isDrag = isDrag;
}

function isLineClicked(clickedPos, idx) {
  const pos = gMeme.lines[idx].pos;
  let textSize = gCtx.measureText(gMeme.lines[idx].txt);
  let leftSideText = textSize.actualBoundingBoxLeft;
  let rightSideText = textSize.actualBoundingBoxRight;
  return (
    clickedPos.x >= pos.x - leftSideText &&
    clickedPos.x <= pos.x + rightSideText &&
    clickedPos.y <= pos.y &&
    clickedPos.y >= pos.y - gMeme.lines[idx].size
  );
}
function getLine() {
  var idx = getSelectedLineIdx();
  return gMeme.lines[idx];
}

function moveLine(line, dx, dy) {
  line.pos.x += dx;
  line.pos.y += dy;
}

function addSticker(txt) {
  addLine(txt);
}

function saveMeme() {
  const dataURI = gCanvas.toDataURL();
  gSavedMemes.push({ url: dataURI });
  saveToStorage(KEY_MEME, gSavedMemes);
  alert('Great now you can see it in the Memes section');
}

function loadSavedMemesFromLocal() {
  gSavedMemes = loadFromStorage(KEY_MEME);
  if (!gSavedMemes) gSavedMemes = [];
  saveToStorage(KEY_MEME, gSavedMemes);
}

function getSavedMemes() {
  return gSavedMemes;
}

function removeSaved(idx) {
  var isConfirm = confirm('Are you sure?');
  if (isConfirm) {
    gSavedMemes.splice(idx, 1);
    saveToStorage(KEY_MEME, gSavedMemes);
  }
}
