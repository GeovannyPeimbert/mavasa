import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  @Output() dataAboutLoaded = new EventEmitter<string>();
  ngAfterViewInit() {
    this.dataAboutLoaded.emit('AboutComponent');
  }
}
