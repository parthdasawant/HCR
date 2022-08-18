const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const container = document.getElementById('container')
const predictBtn = document.getElementById('predictBtn')
const resetBtn = document.getElementById('resetBtn')
const colorPicker = document.getElementById('colorPicker')

let isSomethingOnCanvas = false

resizeWindow()

function resizeWindow() {
  ctx.canvas.width = 500
  ctx.canvas.height = 500
}

// Normalize the screen coordinates to canvas coordinates
function normalizeCanvasCoords(x, y) {
  const boundingBox = canvas.getBoundingClientRect();
  return {
    x: (x - boundingBox.left) * (ctx.canvas.width / boundingBox.width),
    y: (y - boundingBox.top) * (ctx.canvas.height / boundingBox.height)
  }
}


// Download the transparent image of a canvas
function downloadCanvasAsImage() {
  if (!isSomethingOnCanvas) return
  let downloadLink = document.createElement('a')
  downloadLink.setAttribute('download', 'CanvasAsImage.png')
  canvas.toBlob(blob => {
    let url = URL.createObjectURL(blob)
    downloadLink.setAttribute('href', url)
    downloadLink.click()
  })
}

let position = { x: 0, y: 0 }

function setPosition({ clientX, clientY }) {
  const { x: inputX, y: inputY } = normalizeCanvasCoords(clientX, clientY);
  position.x = inputX;
  position.y = inputY;
}

function draw(event) {
  if (event.buttons !== 1) return;
  let color = 'black'

  ctx.beginPath()
  ctx.lineWidth = 30
  ctx.lineCap = 'round'
  ctx.strokeStyle = color
  ctx.moveTo(position.x, position.y)
  setPosition(event)
  ctx.lineTo(position.x, position.y)
  ctx.stroke()

  isSomethingOnCanvas = true
}

function downloadAfterDelay() {
  if (isSomethingOnCanvas) {
    setTimeout(() => {
      downloadCanvasAsImage()
    }, 4000)
  }
}

// downloadAfterDelay()

window.addEventListener('resize', resizeWindow)
canvas.addEventListener('mousemove', draw)
document.addEventListener('mousedown', setPosition)
predictBtn.addEventListener('click', downloadCanvasAsImage)
resetBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})