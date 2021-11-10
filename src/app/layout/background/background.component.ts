import { Component, HostListener, OnInit } from '@angular/core'

declare var p5: any

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styles: [],
})
export class BackgroundComponent implements OnInit {
  constructor() {}

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    const y = window.pageYOffset

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    } else {
      const backgroundCanvasWrapper = document.getElementById('background-canvas-wrapper') as HTMLElement
      if (backgroundCanvasWrapper) {
        backgroundCanvasWrapper.style.top = y + 'px'
      }
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // this.bouncingBallBg()
    this.followingMouseBg()
  }

  bouncingBallBg() {
    new p5((p: any) => {
      let x = 220
      let y = 180
      let xspeed = 6
      let yspeed = 6

      let r = 25

      p.setup = () => {
        p.createCanvas(window.innerWidth - 10, window.innerHeight - 50)
        p.stroke('rgb(255,0,0)')
        p.fill('rgb(255,0,0)')
      }

      p.draw = () => {
        p.background('#0d1529')

        p.ellipse(x, y, r * 2, r * 2)
        x += xspeed
        y += yspeed
        if (x > p.width - r || x < r) {
          xspeed = -xspeed
        }
        if (y > p.height - r || y < r) {
          yspeed = -yspeed
        }
      }

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth - 10, window.innerHeight - 50)
      }
    }, document.getElementById('background-canvas') as HTMLElement)
  }

  followingMouseBg() {
    new p5((p: any) => {
      let clouds: any
      let birds: any
      let shapeWidth = 60
      let shapeHeight = 20
      let magnitude = 2

      p.setup = () => {
        p.createCanvas(window.innerWidth - 10, window.innerHeight - 50)
        clouds = new p.Group()
        birds = new p.Group()

        for (let i = 0; i < 10; i++) {
          let c = p.createSprite(p.random(p.width), p.random(p.height), p.random(25, 100), p.random(25, 100))
          c.shapeColor = p.color(p.random(200, 255))
          clouds.add(c)
        }
        for (let i = 0; i < 5; i++) {
          let b = p.createSprite(p.random(p.width), p.random(p.height), shapeHeight, shapeWidth)
          b.shapeColor = p.color(255, 0, p.random(255))
          b.friction = p.random(0.01, 0.1)
          b.maxSpeed = 100 // p.random(1, 4)
          b.rotateToDirection = true
          birds.add(b)
        }
      }

      p.draw = () => {
        p.background(0, 150, 240)
        for (let i = 0; i < clouds.length; i++) {
          clouds[i].position.x += clouds[i].width * 0.01
          if (clouds[i].position.x > p.width) {
            clouds[i].position.x = 0
          }
        }
        for (let i = 0; i < birds.length; i++) {
          birds[i].attractionPoint(magnitude, p.mouseX, p.mouseY)
        }
        p.drawSprites()
      }

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth - 10, window.innerHeight - 50)
      }
    }, document.getElementById('background-canvas') as HTMLElement)
  }
}
