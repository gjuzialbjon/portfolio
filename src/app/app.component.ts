import { Component } from '@angular/core'
import { DesignService } from '@layout-services/design.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'portofolio'

  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en')

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en')
  }

  ngOnInit() {}
}
