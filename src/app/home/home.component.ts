import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF,faInstagram,faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit{
  facebookIcon = faFacebookF;
  instagramIcon = faInstagram;
  whatsappIcon = faWhatsapp;
  circleIcon = faCircle;

  @Output() dataHomeLoaded = new EventEmitter<string>();
  ngAfterViewInit() {
    this.dataHomeLoaded.emit('HomeComponent');
  }
}
