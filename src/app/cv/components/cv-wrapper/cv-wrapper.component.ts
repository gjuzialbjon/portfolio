import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv-wrapper',
  templateUrl: './cv-wrapper.component.html',
})
export class CvWrapperComponent implements OnInit {

  skills = [
    {
      name: 'Angular',
      rating: 100
    },
    {
      name: 'HTML5',
      rating: 100
    },
    {
      name: 'CSS3',
      rating: 100
    },
    {
      name: 'Debugging',
      rating: 100
    },
    {
      name: 'Typescript',
      rating: 90
    },
    {
      name: 'NgRx',
      rating: 90
    },
    {
      name: 'RxJs',
      rating: 90
    },
    {
      name: 'Javascript',
      rating: 90
    },
    {
      name: 'Npm',
      rating: 90
    },
    {
      name: 'Googling',
      rating: 90
    },
    {
      name: 'Version Control',
      rating: 90
    },
    {
      name: 'Scrum',
      rating: 90
    },
    {
      name: 'Linux',
      rating: 90
    },
    {
      name: 'NodeJS',
      rating: 60
    },
    {
      name: 'Java',
      rating: 60
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
