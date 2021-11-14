import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core'

@Component({
  selector: 'app-home-wrapper',
  templateUrl: './home-wrapper.component.html',
})
export class HomeWrapperComponent implements OnInit {
  @ViewChild('firstQuestion') firstQuestion: any
  intro = `Hi, I'm Albjon, your next website Front-end developer :)`
  introArr = this.intro.split(' ')

  left = '#d53a33'
  front = '#e7ac20'
  top = '#1d9099'

  changes = 0

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.resetCubeColors()
  }

  clrUpdated(position: string, event: Event) {
    const clr = (event.target as HTMLInputElement).value
    document.documentElement.style.setProperty(`--box__cube__${position}__clr`, clr)
  }

  animateLetter(index: number) {
    const el = document.getElementById(`letter-${index}`)
    el?.classList.add('rubberBand')
    if (el) {
      el.style.color = 'var(--box__cube__left__clr)'
    }
  }

  removeAnimateLetter(index: number) {
    const el = document.getElementById(`letter-${index}`)
    el?.classList.remove('rubberBand')
    if (el) {
      el.style.color = '#fff'
    }
  }

  resetCubeColors() {
    document.documentElement.style.setProperty(`--box__cube__left__clr`, this.left)
    document.documentElement.style.setProperty(`--box__cube__top__clr`, this.top)
    document.documentElement.style.setProperty(`--box__cube__front__clr`, this.front)
  }
}
