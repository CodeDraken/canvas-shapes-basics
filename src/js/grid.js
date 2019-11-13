// This was the first iteration
// of the animated grid I put together

;(function () {
  let canvas, ctx, mouse

  // helper / visualizer to see x / y coordinates
  class Mouse {
    constructor (ctx, x = 0, y = 0) {
      this.x = x
      this.y = y
      this.ctx = ctx
    }

    // sets x, y from mousemove event
    set pos (evt) {
      const canvasDimensions = canvas.getBoundingClientRect()

      // get mouse position relative to canvas
      this.x = Math.floor(evt.clientX - canvasDimensions.left)
      this.y = Math.floor(evt.clientY - canvasDimensions.top)

      const { x, y, ctx } = this
      const txt = `X: ${x}, Y: ${y}`

      // set the font
      ctx.font = '16px Monospace'

      // offset the text position for readability (so it doesnt go off screen)
      const offsetX = x < canvas.width / 2 ? 20 : -ctx.measureText(txt).width - 20
      const offsetY = y < canvas.height / 2 ? 25 : -18

      ctx.fillText(txt, this.x + offsetX, this.y + offsetY)
    }
  }

  // basic line class
  class Line {
    constructor (color, lineWidth, startX, startY, endX, endY) {
      this.color = color
      this.lineWidth = lineWidth
      this.startX = startX
      this.startY = startY
      this.endX = endX
      this.endY = endY
    }

    draw (ctx) {
      const { color, lineWidth, startX, startY, endX, endY } = this

      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.stroke()
    }
  }

  // grid
  class Grid {
    constructor (
      // default values
      color = 'gray', lineWidth = 0.25, step = 25,
      boldNth = 5, boldColor = 'Darkgray', boldWidth = 0.5
    ) {
      // set our values
      this.color = color
      this.lineWidth = lineWidth
      this.step = step
      this.boldNth = boldNth
      this.boldColor = boldColor
      this.boldWidth = boldWidth

      // set this to not exist at start
      this.lines = null
    }

    // adds lines to our lines array property
    createLines () {
      const {
        color, lineWidth, step,
        boldNth, boldColor, boldWidth
      } = this

      // create a lines array to build upon
      const lines = []

      // used to calculate every nth line, i.e. every 5th line
      const div = boldNth * step

      // create vertical lines
      for (let x = 0; x < canvas.width; x += step) {
        // if this is equal to 0
        // it means its our nth line and we should bold it
        const isNth = x % div === 0

        // start at X: x, Y: 0 & end at X: x, Y: canvas.height
        // X is unchanged from start to end, only Y changes thus creating
        // a vertical line
        lines.push(
          isNth
            ? new Line(boldColor, boldWidth, x, 0, x, canvas.height)
            : new Line(color, lineWidth, x, 0, x, canvas.height)
        )
      }

      // create horizontal lines
      for (let y = 0; y < canvas.height; y += step) {
        const isNth = y % div === 0

        lines.push(
          isNth
            ? new Line(boldColor, boldWidth, 0, y, canvas.width, y)
            : new Line(color, lineWidth, 0, y, canvas.width, y)
        )
      }

      // add the array as a property
      this.lines = lines
    }

    drawText (ctx) {
      const { step, boldNth, boldColor } = this

      // set font
      ctx.font = '16px Monospace'
      ctx.fillStyle = boldColor

      // add 0,0
      ctx.fillText('0', 1, 15)

      // create vertical text
      for (let x = step * boldNth; x < canvas.width; x += step * boldNth) {
        // text with value of x, at position x, 15 pixels below top of canvas
        ctx.fillText(x, x, 15)
      }

      // create horizontal text
      for (let y = step * boldNth; y < canvas.height; y += step * boldNth) {
        // text with value of y, at position 0, Y + 15 pixels below bolded line
        ctx.fillText(y, 0, y + 15)
      }
    }

    // draw all of our lines
    draw (ctx) {
      if (!this.lines) this.createLines()

      // uncomment this to see the array of lines
      // console.log(lines)

      this.lines.forEach(line => line.draw(ctx))
      this.drawText(ctx)
    }
  }

  function init () {
    // set our config variables
    canvas = document.getElementById('gameCanvas')
    ctx = canvas.getContext('2d')
    mouse = new Mouse(ctx)

    // draw grid
    // default values
    // color = 'gray', lineWidth = 0.25, step = 25,
    // boldNth = 5, boldColor = 'Darkgray', boldWidth = 0.5

    // default gray version
    // const grid = new Grid()

    // gray with 50px steps
    const grid = new Grid('gray', 0.25, 50, 2)

    // pink version
    // const grid = new Grid('DeepPink', 0.25, 50, 2, 'DarkViolet', 1)

    grid.draw(ctx)

    // logs coordinates at mouse position to console
    canvas.addEventListener('mousemove', (evt) => {
      // clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // redraw grid
      grid.draw(ctx)

      // call the mouse set pos() function passing in evt
      mouse.pos = evt
      // console.log(`Mouse X: ${mouse.x}, Y: ${mouse.y}`)
    })
  }

  document.addEventListener('DOMContentLoaded', init)
})()
