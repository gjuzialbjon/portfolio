import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-hidden-cards',
  templateUrl: './hidden-cards.component.html',
  styles: [],
})
export class HiddenCardsComponent implements OnInit {
  @Input() vertical = true

  count = 14

  constructor() {}

  ngOnInit(): void {}
}
