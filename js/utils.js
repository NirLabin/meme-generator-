'use stirct';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// function onDown(ev) {
//   const pos = getEvPos(ev);
//   console.log(pos);
//   let lineClicked = getLineClicked(pos);
//   if (!lineClicked) return;
//   setLineDrag(true, lineClicked);
//   gStartPos = pos;
//   document.querySelector('.meme-canvas').style.cursor = 'grabbing';
// }

// function onMove(ev) {
//   if (!gMeme.lines.length) return;
//   const line = getLineDrag();
//   console.log(line);
//   if (!line || !line.isDrag) return;
//   const pos = getEvPos(ev);
//   const dx = pos.x - gStartPos.x;
//   const dy = pos.y - gStartPos.y;
//   gStartPos = pos;
//   moveLine(line, dx, dy);
//   drawMeme();
// }

// function onUp(ev) {
//   let line = getLineDrag();
//   setLineDrag(false, line);
//   document.querySelector('.meme-canvas').style.cursor = 'grab';
// }

// function setLineDrag(isDrag, line) {
//   console.log(gLineDrag);
//   if (isDrag) gLineDrag = line;
//   gLineDrag.isDrag = isDrag;
// }

// function getLineDrag() {
//   return gLineDrag;
// }

// function getLineClicked(clickedPos) {
//   console.log(clickedPos);
//   console.log(gMeme.lines);
//   return gMeme.lines.find((line) =>
//     isLineClicked(clickedPos, line.pos, line.txt, line.size)
//   );
// }

// function isLineClicked(clickedPos, pos, txt, size) {
//   let textSize = gCtx.measureText(txt);
//   let w = textSize.width;
//   return (
//     clickedPos.x >= pos.x &&
//     clickedPos.x <= pos.x + w &&
//     clickedPos.y <= pos.y &&
//     clickedPos.y >= pos.y + size
//   );
// }
