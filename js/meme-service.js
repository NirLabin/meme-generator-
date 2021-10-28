'use strict';

const KEY_MEM = 'meme';
var gMeme;
var gLineSpace = 1;

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
    keywords: [, 'obama', 'laugh', 'president'],
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

function resetMeme() {
  gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    dataUrl: undefined,
    lines: [
      {
        txt: 'Make a meme',
        size: 40,
        align: 'center',
        strokeColor: '#000000',
        fillColor: '#ffffff',
        font: 'Impact',
        pos: {
          x: 225,
          y: 50,
        },
      },
    ],
  };
}

function filterByName(inputVal) {
  const images = gImages;
  var filteredImages = images.filter((img) => {
    var keyWordArr = img.keywords.filter((keyword) => {
      return keyword.toLowerCase().startsWith(inputVal);
    });
    if (keyWordArr.length) return true;
  });
  return filteredImages;
}

function getSelectedLineIdx() {
  console.log(gMeme.selectedLineIdx);
  return gMeme.selectedLineIdx;
}

function getLinesNum() {
  return gMeme.lines.length;
}

function addLine() {
  var newLine = _createLine();
  gMeme.lines.push(newLine);
  console.log(gMeme);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function removeLine(idx) {
  gMeme.lines.splice(idx, 1);
  gMeme.selectedLineIdx = 0;
}

function switchLine() {
  var idx = getSelectedLineIdx();
  var linesNum = getLinesNum();
  idx = idx === linesNum - 1 ? 0 : ++idx;
  gMeme.selectedLineIdx = idx;
}

function _createLine() {
  return {
    txt: 'Add text here',
    size: 40,
    align: 'center',
    strokeColor: '#000000',
    fillColor: '#ffffff',
    font: 'Impact',
    pos: {
      x: 225,
      y: getRandomInt(40, 450),
    },
  };
}

function textUp() {
  var idx = getSelectedLineIdx();
  if (gMeme.lines[idx].pos.y < 40) return;
  gMeme.lines[idx].pos.y += -5;
}

function textDown() {
  var idx = getSelectedLineIdx();
  if (gMeme.lines[idx].pos.y > 450) return;
  gMeme.lines[idx].pos.y += 5;
}
