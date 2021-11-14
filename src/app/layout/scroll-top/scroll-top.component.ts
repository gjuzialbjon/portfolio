import { DOCUMENT } from '@angular/common'
import { Component, HostListener, Inject, OnInit } from '@angular/core'

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styles: [],
})
export class ScrollTopComponent implements OnInit {
  windowScrolled: boolean = false

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 250) {
      this.windowScrolled = true
    } else if ((this.windowScrolled && window.pageYOffset) || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false
    }
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }
}
