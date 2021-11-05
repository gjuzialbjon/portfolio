import { Inject, Injectable } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { environment } from 'src/environments/environment'
import { Themes } from '../enums/themes'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  defaultLocalTheme = localStorage.getItem('default-theme')
  theme =
    environment.production && (this.defaultLocalTheme === Themes.dark || this.defaultLocalTheme === Themes.light)
      ? this.defaultLocalTheme
      : environment.defaultTheme || Themes.dark

  themeSubject = new BehaviorSubject(this.theme)

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.loadStyle(this.theme)
  }

  toggleTheme() {
    if (this.theme === Themes.dark) {
      this.loadStyle(Themes.light)
    } else {
      this.loadStyle(Themes.dark)
    }
  }

  loadStyle(theme: Themes) {
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
    localStorage.setItem('default-theme', theme)
  }

  getTheme(): Observable<Themes> {
    return this.themeSubject.asObservable()
  }
}
