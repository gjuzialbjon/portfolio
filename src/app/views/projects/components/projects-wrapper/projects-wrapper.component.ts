import { Component, OnInit } from '@angular/core'
import { environment } from '@env/environment'
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { ProjectsService } from '../../services/projects.service'

@Component({
  selector: 'app-projects-wrapper',
  templateUrl: './projects-wrapper.component.html',
  styles: [],
})
export class ProjectsWrapperComponent implements OnInit {
  projects: any

  constructor(config: NgbCarouselConfig, private projectsService: ProjectsService) {
    config.interval = 3500
    config.wrap = true
    config.keyboard = true
    config.pauseOnHover = true

    this.projects = this.projectsService.projectsMainList
  }

  ngOnInit() {}
}
