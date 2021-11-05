import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-change-colors',
  templateUrl: './change-colors.component.html',
  styles: [],
})
export class ChangeColorsComponent implements OnInit {
  colors = {
    body__bg: '#292929',
    body__clr: '#ffffff',
    progress__bar__bg: '#323232',
    progress__bar__clr: '#ffffff',
    scroll__top__clr: 'purple',
    scrollbar__clr: '#8a93bd',
    cv__box__shadow__clr: '#999999',
    cv_left__bg: '#000000',
    cv_left__clr: '#ffffff',
    cv_right__bg: '#ffffff',
    cv_right__primary__text__clr: '#050f34',
    cv_right__secondary__text__clr: '#696f85',
    cv_left__section__border__clr: '#ffffff',
    header__bg: '#3b3b3b',
    header__title__clr: '#ffffff',
    header__theme__btn__clr: '#ff9900',
    header__theme__btn__bg: '#ffffff',
    header__menu__clr: '#efefef',
    header__menu__item__hover__clr: '#1b1a1a',
    header__menu__item__hover__bg: '#eeeaeacb',
    header__mobile__toggle__clr: '#eeeeee',
    settings__btn__clr: '#1b7591',
    footer__btn__shadow__clr: '#0273f3a6',
    footer__btn__hover__shadow__clr: '#0273f3a6',
    copyright__clr: '#d6caca',
  }

  constructor() {}

  ngOnInit(): void {}

  updateColor(clr: string, event: Event) {
    const clr_val = (event.target as HTMLInputElement).value
    document.documentElement.style.setProperty(`--${clr}`, clr_val)
  }
}
