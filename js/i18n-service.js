'use strict';

var gTrans = {
  gallery: {
    en: 'Gallery',
    he: 'גלריה',
  },
  editor: {
    en: 'Editor',
    he: 'עורך',
  },
  memes: {
    en: 'Memes',
    he: 'ממים',
  },
  about: {
    en: 'About',
    he: 'עלינו',
  },
  'create-meme': {
    en: 'Create Meme',
    he: 'ערוך מימ',
  },
  stroke: {
    en: 'Stroke',
    he: 'מעטפת',
  },
  fill: {
    en: 'Fill',
    he: 'מילוי',
  },
  'Enter-text': {
    en: 'Enter Text',
    he: 'הכנס טקסט',
  },
  save: {
    en: 'Save',
    he: 'שמור',
  },
  download: {
    en: 'Download',
    he: 'הורדה',
  },
  share: {
    en: 'Share',
    he: 'שתף',
  },
  remove: {
    en: 'Remove',
    he: 'מחק',
  },
};

var gCurrLang = 'en';

function getTrans(transKey) {
  var keyTrans = gTrans[transKey];
  if (!keyTrans) return 'UNKNOWN';
  var txt = keyTrans[gCurrLang];
  if (!txt) txt = keyTrans.en;
  return txt;
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]');
  els.forEach((el) => {
    var elTrans = el.dataset.trans;
    if (el.nodeName === 'INPUT') {
      el.placeholder = getTrans(elTrans);
    } else {
      el.innerText = getTrans(elTrans);
    }
  });
}

function setLang(lang) {
  gCurrLang = lang;
}
