import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv-wrapper',
  templateUrl: './cv-wrapper.component.html',
  styleUrls: ['./cv-wrapper.component.scss']
})
export class CvWrapperComponent implements OnInit {

  skills = [
    {
      name: 'Angular',
      rating: 100
    },
    {
      name: 'Angular',
      rating: 100
    },
    {
      name: 'Angular',
      rating: 100
    },
    {
      name: 'Angular',
      rating: 100
    },
    {
      name: 'Angular',
      rating: 100
    },
    {
      name: 'Angular',
      rating: 100
    },
    {
      name: 'Angular',
      rating: 100
    },
    {
      name: 'Angular',
      rating: 100
    },
    {
      name: 'Angular',
      rating: 100
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
