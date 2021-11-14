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
  project: any = null
  errorImg = 'https://via.placeholder.com/300x200'
  
  public viewerOptions: any = {
    navbar: false,
    toolbar: {
      zoomIn: 4,
      zoomOut: 4,
      oneToOne: 4,
      reset: 4,
      prev: 4,
      play: {
        show: 4,
        size: 'large',
      },
      next: 4,
      rotateLeft: 4,
      rotateRight: 4,
      flipHorizontal: 4,
      flipVertical: 4,
    },
  }

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
