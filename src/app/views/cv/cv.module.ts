import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CvRoutingModule } from './cv-routing.module'
import { CvWrapperComponent } from './components/cv-wrapper/cv-wrapper.component'
// @ts-ignore
import { FileSaverModule } from 'ngx-filesaver'
import { HttpClientModule } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [CvWrapperComponent],
  imports: [CommonModule, CvRoutingModule, FileSaverModule, HttpClientModule, TranslateModule.forChild()],
})
export class CvModule {}
