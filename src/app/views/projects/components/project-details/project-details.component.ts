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
  extra = 0

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
      if (this.project[`extra_${this.extra + 1}`]) {
        this.extra++
      }
    } else {
      console.warn('Cannot find this project...')
    }
  }

  ngAfterViewInit() {
    if (window.innerWidth > 1024) {
      const allImgs = document.getElementById('all-project-images')
      if (allImgs) {
        allImgs.style.height = this.project.imgs.length > 3 ? '500px' : '220px'
      }
    }
  }

  moreImages() {
    const extraImgs = this.project[`extra_${this.extra}`] as []
    this.project.imgs = [...this.project.imgs, ...extraImgs]

    if (this.project[`extra_${this.extra + 1}`]) {
      this.extra++
    } else {
      this.extra = 0
    }
  }
}
