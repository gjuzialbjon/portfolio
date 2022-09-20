import { Component, OnInit } from '@angular/core'
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
  navButton!: HTMLInputElement | null
  // Themes = Themes
  // theme!: Observable<Themes>
  langCheckbox
  lang: 'al' | 'en'

  constructor(private themeService: ThemeService, private translate: TranslateService, private title: Title) {
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
}
