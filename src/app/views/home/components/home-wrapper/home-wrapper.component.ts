import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import * as p5 from 'p5'

@Component({
  selector: 'app-home-wrapper',
  templateUrl: './home-wrapper.component.html',
})
export class HomeWrapperComponent implements OnInit {
  @ViewChild('firstQuestion') firstQuestion: any
  firstAnswer = 'none'
  intro = `Hi, I'm Albjon, your next website Front-end developer :)`
  introArr = this.intro.split('')

  changes = 0
  solvedFirst
  wrongFirstAnswers: string[] = []

  animations = ['animate__animated', 'animate__rubberBand']

  constructor(private modalService: NgbModal, private el: ElementRef, private renderer: Renderer2) {
    this.solvedFirst = localStorage.getItem('solvedFirst') === 'yes'
  }

  ngOnInit(): void {
    new p5((p) => {
      let y = 100

      p.setup = () => {
        p.createCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight)
        p.stroke(255) // Set line drawing color to white
        p.frameRate(30)
        p.noLoop()
      }

      p.draw = () => {
        p.background('#222b45')
        y = y - 1
        if (y < 0) {
          y = p.height
        }
        p.line(0, y, p.width, y)
      }

      p.mousePressed = () => {
        p.redraw()
      }
    }, document.getElementsByTagName('body')[0] as HTMLElement)
  }

  ngAfterViewInit() {
    if (!this.solvedFirst) {
      setTimeout(() => {
        this.modalService.open(this.firstQuestion)
      }, 3500)
    }
  }

  clrUpdated(position: string, event: Event) {
    const clr = (event.target as HTMLInputElement).value
    document.documentElement.style.setProperty(`--box__cube__${position}__clr`, clr)
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true })
  }

  didntSpot() {}

  solveFirst(choice: string) {
    if (choice === this.firstAnswer) {
      // Final firstAnswer chosen
      console.log('Final firstAnswer chosen?')
      if (choice === 'd') {
        localStorage.setItem('solvedFirst', 'yes')
        this.modalService.dismissAll()
      } else {
        this.wrongFirstAnswers.push(choice)
        this.firstAnswer = 'none'
      }
    } else {
      this.firstAnswer = choice
    }
  }

  animateLetter(index: number) {
    const el = document.getElementById(`letter-${index}`)
    el?.classList.add(this.animations[0])
    el?.classList.add(this.animations[1])
    if (el) {
      el.style.color = 'var(--box__cube__left__clr)'
    }
  }

  removeAnimateLetter(index: number) {
    const el = document.getElementById(`letter-${index}`)
    el?.classList.remove(this.animations[0])
    el?.classList.remove(this.animations[1])
    if (el) {
      el.style.color = '#fff'
    }
  }
}
