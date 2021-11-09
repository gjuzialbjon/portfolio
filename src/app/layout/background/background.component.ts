import { Component, HostListener, OnInit } from '@angular/core'
import * as p5 from 'p5'

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

    const backgroundCanvasWrapper = document.getElementById('background-canvas-wrapper') as HTMLElement
    if(backgroundCanvasWrapper) {
      backgroundCanvasWrapper.style.top = y + 'px';
    }
  }

  ngOnInit(): void {
    new p5((p) => {
      let x = 220
      let y = 180
      let xspeed = 4
      let yspeed = 4

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
}
