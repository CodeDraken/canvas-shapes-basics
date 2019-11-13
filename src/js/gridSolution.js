// GRID CHALLENGE SOLUTION

;(function () {
  let canvas, ctx

  // draws a grid
  function createGrid () {
    // draw a line every *step* pixels
    const step = 50

    // our end points
    const width = canvas.width
    const height = canvas.height

    // set our styles
    ctx.save()
    ctx.strokeStyle = 'gray' // line colors
    ctx.fillStyle = 'black' // text color
    ctx.font = '14px Monospace'
    ctx.lineWidth = 0.35

    // draw vertical from X to Height
    for (let x = 0; x < width; x += step) {
      // draw vertical line
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()

      // draw text
      ctx.fillText(x, x, 12)
    }

    // draw horizontal from Y to Width
    for (let y = 0; y < height; y += step) {
      // draw horizontal line
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()

      // draw text
      ctx.fillText(y, 0, y)
    }

    // restore the styles from before this function was called
    ctx.restore()
  }

  function init () {
    // set our config variables
    canvas = document.getElementById('gameCanvas')
    ctx = canvas.getContext('2d')

    createGrid()
  }

  document.addEventListener('DOMContentLoaded', init)
})()
