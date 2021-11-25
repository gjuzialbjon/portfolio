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
  project: any = {}
  errorImg = 'https://via.placeholder.com/300x200'
  extra = 0
  imgs = []

  viewerOptions: any = {
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
    Object.assign(this.project, this.projectsService.allProjects[this.id])
    this.imgs = this.project.imgs

    if (this.project) {
      if (this.project[`extra_${this.extra + 1}`]) {
        this.extra++
      }
    } else {
      console.warn('Cannot find this project...')
    }
  }

  moreImages() {
    this.imgs = []
    const extraImgs = this.project[`extra_${this.extra}`] as []
    this.project.imgs = [...this.project.imgs, ...extraImgs]

    if (this.project[`extra_${this.extra + 1}`]) {
      this.extra++
    } else {
      this.extra = 0
    }

    setTimeout(() => {
      this.imgs = this.project.imgs
    }, 10)
  }
}
