import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DesignService {
  showBreadcrumb = new BehaviorSubject(true)

  constructor(@Inject(DOCUMENT) private document: Document) {
    setTimeout( () => {
      this.showBreadcrumb.next(false)
    }, 2000)
  }

  canShowBreadcrumb() {
    return this.showBreadcrumb.asObservable()
  }
}
