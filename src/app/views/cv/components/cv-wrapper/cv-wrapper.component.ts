import { HttpClient } from '@angular/common/http'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

@Component({
  selector: 'app-cv-wrapper',
  templateUrl: './cv-wrapper.component.html',
})
export class CvWrapperComponent implements OnInit {
  @ViewChild('cv') cv!: ElementRef

  downloading = false

  skills = [
    {
      name: 'Angular',
      rating: 87,
      website: 'https://angular.io/',
    },
    {
      name: 'Typescript',
      rating: 88,
      website: 'https://www.typescriptlang.org/',
    },
    {
      name: 'NgRx',
      rating: 70,
      website: 'https://ngrx.io/',
    },
    {
      name: 'RxJs',
      rating: 70,
      website: 'https://rxjs.dev/',
    },
    {
      name: 'Javascript',
      rating: 78,
      website: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      name: 'HTML5',
      rating: 95,
      website: 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5',
    },
    {
      name: 'CSS(Sass)',
      rating: 85,
      website: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    },
    {
      name: 'Bootstrap',
      rating: 95,
      website: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    },

    {
      name: 'REST',
      rating: 90,
      website: 'https://www.npmjs.com/',
    },
    {
      name: 'GraphQL',
      rating: 83,
      website: 'https://graphql.org/',
    },
    {
      name: 'Git',
      rating: 85,
      website: 'https://git-scm.com/',
    },
    {
      name: 'Scrum',
      rating: 90,
      website: 'https://www.scrum.org/',
    },
    {
      name: 'JIRA',
      rating: 90,
      website: 'https://ubuntu.com/',
    },
  ]

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {}

  downloadCV() {
    this.downloading = true

    var width = (this.cv.nativeElement as HTMLDivElement).clientWidth
    var height = (this.cv.nativeElement as HTMLDivElement).clientHeight

    html2canvas(this.cv.nativeElement).then((canvas) => {
      var img = canvas.toDataURL('image/png')
      var doc = new jsPDF('p', 'pt', [width, height])
      doc.addImage(
        img,
        'PNG',
        0,
        0,
        width,
        height
      )
      doc.save('Albjon_Gjuzi_CV.pdf')
      this.downloading = false
    }).catch(e => {
      console.error(e)
    })
  }
}
