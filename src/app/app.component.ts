import { Component } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private translate: TranslateService, private title: Title) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en')  
  }

  ngOnInit() {}
}
