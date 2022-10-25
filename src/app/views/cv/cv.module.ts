import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CvRoutingModule } from './cv-routing.module'
import { CvWrapperComponent } from './components/cv-wrapper/cv-wrapper.component'
import { HttpClientModule } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [CvWrapperComponent],
  imports: [CommonModule, CvRoutingModule, FormsModule, HttpClientModule, TranslateModule.forChild()],
})
export class CvModule {}
