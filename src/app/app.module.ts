import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './layout/header/header.component'
import { FooterComponent } from './layout/footer/footer.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ScrollTopComponent } from './layout/scroll-top/scroll-top.component'
import { BackgroundComponent } from './layout/background/background.component'
import { ContactComponent } from './layout/footer/contact/contact.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { environment } from '@env/environment'
import { ServiceWorkerModule } from '@angular/service-worker'

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, ScrollTopComponent, BackgroundComponent, ContactComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
