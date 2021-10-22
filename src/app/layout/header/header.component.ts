import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  navButton!: HTMLInputElement | null

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.navButton = document.getElementById('nav-check') as HTMLInputElement    
  }

  closeMenu() {
    this.navButton!.checked = false
  }
}
