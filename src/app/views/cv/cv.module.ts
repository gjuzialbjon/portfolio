import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CvRoutingModule } from './cv-routing.module'
import { CvWrapperComponent } from './components/cv-wrapper/cv-wrapper.component'
import { HttpClientModule } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'
import { ProgressBarModule } from 'angular-progress-bar'

@NgModule({
  declarations: [CvWrapperComponent],
  imports: [CommonModule, CvRoutingModule, ProgressBarModule, HttpClientModule, TranslateModule.forChild()],
})
export class CvModule {}
