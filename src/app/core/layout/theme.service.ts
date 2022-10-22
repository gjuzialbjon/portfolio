import { Inject, Injectable } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { environment } from 'src/environments/environment'
import { Themes } from '../enums/themes'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  defaultLocalTheme: Themes = localStorage.getItem('default-theme') as Themes
  prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  theme: Themes = environment.production
    ? this.defaultLocalTheme
      ? this.defaultLocalTheme
      : this.prefersDark
      ? Themes.dark
      : environment.defaultTheme
    : Themes.dark

  themeSubject = new BehaviorSubject(this.theme)

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.loadStyle(this.theme)
  }

  toggleTheme() {
    this.loadStyle(this.theme === Themes.dark ? Themes.light : Themes.dark)
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
