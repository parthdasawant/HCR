var canvas = document.getElementById("canvas");
const refreshBtn = document.querySelector('.refreshBtn');
const convertBtn = document.querySelector('.convertBtn');
// console.log(refreshBtn)
var ctx = canvas.getContext("2d");
resizeWindow();

// resize canvas when window is resized
function resizeWindow() {
  ctx.canvas.width = 280;
  ctx.canvas.height = 280;
}

var position = { x: 0, y: 0 };
// new position from mouse events
function setPosition(e) {
  position.x = e.clientX - canvas.offsetLeft;
  position.y = e.clientY - canvas.offsetTop;
}
function draw(e) {
  if (e.buttons !== 1) return;
  // var color = document.getElementById("colorPicker").value;
  var color = 'black';
  ctx.beginPath();
  ctx.lineWidth = 25;
  ctx.lineCap = "round";
  ctx.strokeStyle = color
  ctx.moveTo(position.x, position.y);
  setPosition(e);
  ctx.lineTo(position.x, position.y);
  ctx.stroke();
  // DownloadCanvasAsImage()
}

function DownloadCanvasAsImage() {
  let downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', 'CanvasAsImage.png');
  canvas.toBlob(function (blob) {
    let url = URL.createObjectURL(blob);
    downloadLink.setAttribute('href', url);
    downloadLink.click();
  });
}

window.addEventListener("resize", resizeWindow);
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);
refreshBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
convertBtn.addEventListener('click', DownloadCanvasAsImage)