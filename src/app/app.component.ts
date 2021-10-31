import { Component } from '@angular/core'
import { DesignService } from './core/layout/design.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'portofolio'
  showBreadcrumb

  constructor(private designService: DesignService) {
    this.showBreadcrumb = this.designService.canShowBreadcrumb()
  }
}
