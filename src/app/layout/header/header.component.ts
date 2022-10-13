import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { Themes } from '@enums/themes'
import { ThemeService } from '@layout-services/theme.service'
import { TranslateService } from '@ngx-translate/core'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  @ViewChild('header') headerEl!: ElementRef
  appWrapperEl!: HTMLDivElement

  navButton!: HTMLInputElement | null
  Themes = Themes
  theme!: Observable<Themes>
  langCheckbox
  lang: 'al' | 'en'

  // prevY = 0
  // currentY = 0
  // hideHeader = false

  // @HostListener('window:scroll', ['$event'])
  // checkScroll() {
  //   this.currentY = window.scrollY
  //   console.log('current ', this.currentY, ' prev', this.prevY)

  //   if (this.prevY > this.currentY || this.currentY < 40) {
  //     this.headerEl.nativeElement.style.top = '0'
  //     if (this.appWrapperEl) {
  //       this.appWrapperEl.style.paddingTop = 'calc(50px + 1rem)'
  //     }
  //   } else {
  //     this.headerEl.nativeElement.style.top = '-50px'
  //     if (this.appWrapperEl) {
  //       this.appWrapperEl.style.paddingTop = '20px'
  //     }
  //   }
  //   this.prevY = this.currentY
  // }

  constructor(private themeService: ThemeService, private translate: TranslateService, private title: Title) {
    this.theme = this.themeService.getTheme()
    const stLang = localStorage.getItem('lang') as 'al' | 'en'
    if (stLang === 'al' || stLang === 'en') {
      this.lang = stLang
      this.langCheckbox = stLang === 'al'
    } else {
      this.lang = 'en'
      this.langCheckbox = false
    }

    this.translate.use(this.lang).subscribe(() => {
      this.translate.onDefaultLangChange.next()
      this.title.setTitle(this.translate.instant('title'))
    })
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.navButton = document.getElementById('my-nav-check') as HTMLInputElement
    // this.appWrapperEl = document.getElementById('app-wrapper') as HTMLDivElement
  }

  closeMenu() {
    this.navButton!.checked = false
  }

  onLangChange() {
    this.lang = this.langCheckbox ? 'al' : 'en'
    localStorage.setItem('lang', this.lang)

    this.translate.use(this.lang).subscribe(() => {
      this.translate.onDefaultLangChange.next()
      this.title.setTitle(this.translate.instant('title'))
    })
  }

  toggleTheme() {
    this.themeService.toggleTheme()
  }
}
