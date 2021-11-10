function initOsciliator(remove) {
  console.log('Inside oscillator...')
  if (!remove) {
    var ctx,
      hue,
      logo,
      form,
      buffer,
      target = {},
      tendrils = [],
      settings = {}

    settings.debug = false
    settings.friction = 0.5
    settings.trails = 30
    settings.size = 50
    settings.dampening = 0.25
    settings.tension = 0.98

    Math.TWO_PI = Math.PI * 2

    // ========================================================================================
    // Oscillator
    // ----------------------------------------------------------------------------------------

    function Oscillator(options) {
      this.init(options || {})
    }

    Oscillator.prototype = (function () {
      var value = 0

      return {
        init: function (options) {
          this.phase = options.phase || 0
          this.offset = options.offset || 0
          this.frequency = options.frequency || 0.001
          this.amplitude = options.amplitude || 1
        },

        update: function () {
          this.phase += this.frequency
          value = this.offset + Math.sin(this.phase) * this.amplitude
          return value
        },

        value: function () {
          return value
        },
      }
    })()

    // ========================================================================================
    // Tendril
    // ----------------------------------------------------------------------------------------

    function Tendril(options) {
      this.init(options || {})
    }

    Tendril.prototype = (function () {
      function Node() {
        this.x = 0
        this.y = 0
        this.vy = 0
        this.vx = 0
      }

      return {
        init: function (options) {
          this.spring = options.spring + Math.random() * 0.1 - 0.05
          this.friction = settings.friction + Math.random() * 0.01 - 0.005
          this.nodes = []

          for (var i = 0, node; i < settings.size; i++) {
            node = new Node()
            node.x = target.x
            node.y = target.y

            this.nodes.push(node)
          }
        },

        update: function () {
          var spring = this.spring,
            node = this.nodes[0]

          node.vx += (target.x - node.x) * spring
          node.vy += (target.y - node.y) * spring

          for (var prev, i = 0, n = this.nodes.length; i < n; i++) {
            node = this.nodes[i]

            if (i > 0) {
              prev = this.nodes[i - 1]

              node.vx += (prev.x - node.x) * spring
              node.vy += (prev.y - node.y) * spring
              node.vx += prev.vx * settings.dampening
              node.vy += prev.vy * settings.dampening
            }

            node.vx *= this.friction
            node.vy *= this.friction
            node.x += node.vx
            node.y += node.vy

            spring *= settings.tension
          }
        },

        draw: function () {
          var x = this.nodes[0].x,
            y = this.nodes[0].y,
            a,
            b

          ctx.beginPath()
          ctx.moveTo(x, y)

          for (var i = 1, n = this.nodes.length - 2; i < n; i++) {
            a = this.nodes[i]
            b = this.nodes[i + 1]
            x = (a.x + b.x) * 0.5
            y = (a.y + b.y) * 0.5

            ctx.quadraticCurveTo(a.x, a.y, x, y)
          }

          a = this.nodes[i]
          b = this.nodes[i + 1]

          ctx.quadraticCurveTo(a.x, a.y, b.x, b.y)
          ctx.stroke()
          ctx.closePath()
        },
      }
    })()

    // ----------------------------------------------------------------------------------------

    function init(event) {
      document.removeEventListener('mousemove', init)
      document.removeEventListener('touchstart', init, { passive: false })

      document.addEventListener('mousemove', mousemove)
      document.addEventListener('touchmove', mousemove, { passive: false })
      document.addEventListener('touchstart', touchstart, { passive: false })

      mousemove(event)
      reset()
      loop()
    }

    function reset() {
      tendrils = []

      for (var i = 0; i < settings.trails; i++) {
        tendrils.push(
          new Tendril({
            spring: 0.45 + 0.025 * (i / settings.trails),
          })
        )
      }
    }

    function randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

    var color = randomIntFromInterval(1, 2)

    function loop() {
      if (!ctx.running) return

      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#0d1529'
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.globalCompositeOperation = 'lighter'
      ctx.strokeStyle = 'hsla(346,98%,56%,0.25)'
      ctx.lineWidth = 1

      if (color == 1) {
        ctx.strokeStyle = 'hsla(346,98%,56%,0.25)'
      } else {
        ctx.strokeStyle = 'hsla(171,98%,56%,0.25)'
      }

      for (var i = 0, tendril; i < settings.trails; i++) {
        tendril = tendrils[i]
        tendril.update()
        tendril.draw()
      }

      ctx.frame++
      requestAnimFrame(loop)
    }

    function resize() {
      ctx.canvas.width = window.innerWidth
      ctx.canvas.height = window.innerHeight
    }

    function start() {
      if (!ctx.running) {
        ctx.running = true
        loop()
      }
    }

    function stop() {
      ctx.running = false
    }

    function mousemove(event) {
      if (event.touches) {
        target.x = event.touches[0].pageX
        target.y = event.touches[0].pageY
      } else {
        target.x = event.clientX
        target.y = event.clientY
      }
      event.preventDefault()
    }

    function touchstart(event) {
      if (event.touches.length == 1) {
        target.x = event.touches[0].pageX
        target.y = event.touches[0].pageY
      }
    }

    window.requestAnimFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (fn) {
          window.setTimeout(fn, 1000 / 60)
        }
      )
    })()

    ctx = document.getElementById('canvas').getContext('2d')

    ctx.running = true
    ctx.frame = 1

    hue = new Oscillator({
      phase: Math.random() * Math.TWO_PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    })

    document.addEventListener('mousemove', init)
    document.addEventListener('touchstart', init)
    document.body.addEventListener('orientationchange', resize)
    window.addEventListener('resize', resize)
    window.addEventListener('focus', start)
    window.addEventListener('blur', stop)

    resize()
  } else {
    document.body.removeEventListener('orientationchange', resize)
    window.removeEventListener('resize', resize)
    window.removeEventListener('focus', start)
    window.removeEventListener('blur', stop)

    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('touchmove', mousemove)
    document.removeEventListener('touchstart', touchstart)
  }
}
