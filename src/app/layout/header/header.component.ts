import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ThemesEnum } from 'src/app/core/enums/themes-enum'
import { ThemeService } from 'src/app/core/layout/theme.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  navButton!: HTMLInputElement | null
  Themes = ThemesEnum
  theme!: Observable<ThemesEnum>

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.theme = this.themeService.getTheme()
  }

  ngAfterViewInit() {
    this.navButton = document.getElementById('my-nav-check') as HTMLInputElement
  }

  closeMenu() {
    this.navButton!.checked = false
  }

  toggleTheme() {
    this.themeService.toggleTheme()
  }
}
