import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home-wrapper',
  templateUrl: './home-wrapper.component.html',
})
export class HomeWrapperComponent implements OnInit {
  changes = 0

  constructor() {}

  ngOnInit(): void {}

  leftClrUpdated(event: Event) {
    const clr = (event.target as HTMLInputElement).value
    document.documentElement.style.setProperty('--box__cube__left__clr', clr)
    // this.checkChanges()
  }

  topClrUpdated(event: Event) {
    const clr = (event.target as HTMLInputElement).value
    document.documentElement.style.setProperty('--box__cube__top__clr', clr)
    // this.checkChanges()
  }

  frontClrUpdated(event: Event) {
    const clr = (event.target as HTMLInputElement).value
    document.documentElement.style.setProperty('--box__cube__front__clr', clr)
    // this.checkChanges()
  }

  // checkChanges() {
  //   this.changes++

  //   if (this.changes > 200) {
  //     alert('Too many changes')
  //   }
  // }
}
