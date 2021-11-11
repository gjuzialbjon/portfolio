import { Component, OnInit } from '@angular/core'
import { environment } from '@env/environment'
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-projects-wrapper',
  templateUrl: './projects-wrapper.component.html',
  styles: [],
})
export class ProjectsWrapperComponent implements OnInit {
  images = [
    { f: 'agency', t: 'home', ext: 'png', title: 'Numbers Agency', desc: 'Simple agency description' },
    { f: 'agente', t: 'home', ext: 'png', title: 'Numbers Agente', desc: 'Simple agente description' },
    { f: 'tip', t: 'login', title: 'Tipresento', desc: 'Simple tipresento description' },
    { f: 'swp', t: 'login', title: 'Swap', desc: 'Simple swap description' },
  ]
  projects = this.images.map((img) => {
    return {
      path: `assets/media/${img.f}/${img.t}.${img.ext ? img.ext : 'PNG'}`,
      ...img,
    }
  })

  constructor(config: NgbCarouselConfig) {
    config.interval = 3500
    config.wrap = true
    config.keyboard = true
    config.pauseOnHover = true
  }

  ngOnInit() {}
}
