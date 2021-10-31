import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'

@Component({
  selector: 'app-cv-wrapper',
  templateUrl: './cv-wrapper.component.html',
})
export class CvWrapperComponent implements OnInit {
  @ViewChild('cvContent') cvContent!: ElementRef

  skills = [
    {
      name: 'Angular',
      rating: 100,
      website: 'https://angular.io/',
    },
    {
      name: 'HTML5',
      rating: 100,
      website: 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5',
    },
    {
      name: 'CSS3',
      rating: 100,
      website: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    },
    {
      name: 'Debugging',
      rating: 100,
      website: 'https://www.techopedia.com/definition/16373/debugging',
    },
    {
      name: 'Typescript',
      rating: 90,
      website: 'https://www.typescriptlang.org/',
    },
    {
      name: 'NgRx',
      rating: 90,
      website: 'https://ngrx.io/',
    },
    {
      name: 'RxJs',
      rating: 90,
      website: 'https://rxjs.dev/',
    },
    {
      name: 'Javascript',
      rating: 90,
      website: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      name: 'GraphQL',
      rating: 90,
      website: 'https://graphql.org/',
    },
    {
      name: 'Npm',
      rating: 90,
      website: 'https://www.npmjs.com/',
    },
    {
      name: 'Googling',
      rating: 90,
      website: 'https://www.google.com/',
    },
    {
      name: 'Version Control',
      rating: 90,
      website: 'https://git-scm.com/',
    },
    {
      name: 'Scrum',
      rating: 90,
      website: 'https://www.scrum.org/',
    },
    {
      name: 'Linux',
      rating: 90,
      website: 'https://ubuntu.com/',
    },
    {
      name: 'NodeJS',
      rating: 60,
      website: 'https://nodejs.org/en/',
    },
    {
      name: 'Java',
      rating: 60,
      website: 'https://www.java.com/en/',
    },
  ]

  constructor() {}

  ngOnInit(): void {}
}
