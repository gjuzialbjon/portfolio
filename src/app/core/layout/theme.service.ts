import { Inject, Injectable } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { environment } from 'src/environments/environment'
import { ThemesEnum } from '../enums/themes-enum'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme = environment.defaultTheme || ThemesEnum.dark
  themeSubject = new BehaviorSubject(this.theme)

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.loadStyle(this.theme)
  }

  toggleTheme() {
    if (this.theme === ThemesEnum.dark) {
      this.loadStyle(ThemesEnum.light)
    } else {
      this.loadStyle(ThemesEnum.dark)
    }
  }

  loadStyle(theme: ThemesEnum) {
    const head = this.document.getElementsByTagName('head')[0]

    let themeLink = this.document.getElementById('client-theme') as HTMLLinkElement
    if (themeLink) {
      themeLink.href = `${theme}.css`
    } else {
      const style = this.document.createElement('link')
      style.id = 'client-theme'
      style.rel = 'stylesheet'
      style.href = `${theme}.css`

      head.appendChild(style)
    }

    this.theme = theme
    this.themeSubject.next(theme)
  }

  getTheme(): Observable<ThemesEnum> {
    return this.themeSubject.asObservable()
  }
}
