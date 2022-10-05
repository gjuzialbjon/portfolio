import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-home-wrapper',
  templateUrl: './home-wrapper.component.html',
})
export class HomeWrapperComponent implements OnInit {
  @ViewChild('firstQuestion') firstQuestion: any
  intro = ''
  introArr: string[] = []
  left = '#d53a33'
  front = '#e7ac20'
  top = '#1d9099'

  changes = 0

  constructor(private el: ElementRef, private translate: TranslateService) {
    this.intro = this.translate.instant('Home.sentence')
    this.introArr = this.intro.split(' ')
  }

  ngOnInit(): void {
    this.translate.onDefaultLangChange.subscribe((res) => {
      this.intro = this.translate.instant('Home.sentence')
      this.introArr = this.intro.split(' ')
    })
  }

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
  }

  removeAnimateLetter(index: number) {
    const el = document.getElementById(`letter-${index}`)
    el?.classList.remove('rubberBand')
  }

  resetCubeColors() {
    document.documentElement.style.setProperty(`--box__cube__left__clr`, this.left)
    document.documentElement.style.setProperty(`--box__cube__top__clr`, this.top)
    document.documentElement.style.setProperty(`--box__cube__front__clr`, this.front)
  }
}
