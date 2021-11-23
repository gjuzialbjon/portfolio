import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Themes } from '@enums/themes'
import { ThemeService } from '@layout-services/theme.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  navButton!: HTMLInputElement | null
  Themes = Themes
  theme!: Observable<Themes>
  langCheckbox
  lang: 'al' | 'en'

  constructor(private themeService: ThemeService, private translate: TranslateService) {
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
    })
  }

  ngOnInit(): void {
    this.theme = this.themeService.getTheme()
  }

  ngAfterViewInit() {
    this.navButton = document.getElementById('my-nav-check') as HTMLInputElement
  }

  closeMenu() {
    this.navButton!.checked = false
  }

  // toggleTheme() {
  //   this.themeService.toggleTheme()
  // }

  onLangChange() {
    this.lang = this.langCheckbox ? 'al' : 'en'
    localStorage.setItem('lang', this.lang)

    this.translate.use(this.lang).subscribe(() => {
      this.translate.onDefaultLangChange.next()
    })
  }
}
