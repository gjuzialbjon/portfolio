import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-home-wrapper',
  templateUrl: './home-wrapper.component.html',
})
export class HomeWrapperComponent implements OnInit {
  @ViewChild('firstQuestion') firstQuestion: any
  firstAnswer = 'none'
  intro = `Hi, I'm Albjon, your next website Front-end developer :)`
  introArr = this.intro.split(' ')

  changes = 0
  solvedFirst
  wrongFirstAnswers: string[] = []

  animations = ['animate__animated', 'animate__rubberBand']

  constructor(private modalService: NgbModal, private el: ElementRef, private renderer: Renderer2) {
    this.solvedFirst = localStorage.getItem('solvedFirst') === 'yes'
  }

  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    this.promptFirstQuestion()
  }

  promptFirstQuestion() {
    if (!this.solvedFirst) {
      setTimeout(() => {
        this.modalService.open(this.firstQuestion, { centered: true })
      }, 3500)
    } else {
      this.fixIntro()
    }
  }

  clrUpdated(position: string, event: Event) {
    const clr = (event.target as HTMLInputElement).value
    document.documentElement.style.setProperty(`--box__cube__${position}__clr`, clr)
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true })
  }

  didntSpot() {
    this.modalService.dismissAll()
    this.promptFirstQuestion()
  }

  solveFirst(choice: string) {
    if (choice === this.firstAnswer) {
      if (choice === 'd') {
        this.fixIntro()
        localStorage.setItem('solvedFirst', 'yes')
        this.solvedFirst = true
        setTimeout(() => {
          this.modalService.dismissAll()
        }, 1150)
      } else {
        this.wrongFirstAnswers.push(choice)
        this.firstAnswer = 'none'
      }
    } else {
      this.firstAnswer = choice
    }
  }

  fixIntro() {
    const intro = document.getElementById('intro') as HTMLElement
    intro.style.transform = 'none'
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
