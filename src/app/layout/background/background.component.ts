import { Component, HostListener, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'

declare var p5: any

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styles: [],
})
export class BackgroundComponent implements OnInit {
  constructor(private router: Router) {}

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    const y = window.pageYOffset

    if (!(window.innerHeight + window.scrollY >= document.body.offsetHeight)) {
      const backgroundCanvasWrapper = document.getElementById('background-canvas-wrapper') as HTMLElement
      if (backgroundCanvasWrapper) {
        backgroundCanvasWrapper.style.top = y + 'px'
      }
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        const backgroundCanvasWrapper = document.getElementById('background-canvas-wrapper') as HTMLElement
        if (backgroundCanvasWrapper) {
          backgroundCanvasWrapper.style.top = 0 + 'px'
        }
      }
    })
  }

  ngAfterViewInit() {
    if (!(window.innerWidth < 1025)) {
      //@ts-ignore
      initOsciliator(true)
    }
  }


}
