function uploadImg() {
  const imgDataUrl = gCanvas.toDataURL('image/png');

  function onSuccess(uploadedImgUrl) {
    const imgUrl = encodeURIComponent(uploadedImgUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${imgUrl}&t=${imgUrl}`
    );
  }
  doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData();
  formData.append('img', imgDataUrl);

  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.text())
    .then((url) => {
      console.log('Got back live url:', url);
      onSuccess(url);
    })
    .catch((err) => {
      console.error(err);
    });
}
