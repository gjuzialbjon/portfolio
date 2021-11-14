import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProjectsService } from '../../services/projects.service'

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styles: [],
})
export class ProjectDetailsComponent implements OnInit {
  id = ''
  project: any

  constructor(private route: ActivatedRoute, private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id
    this.project = this.projectsService.allProjects[this.id]

    if (this.project) {
      console.log(this.id, ' exits', this.project)
    } else {
      console.warn('Cannot find this project...')
    }
  }
}
