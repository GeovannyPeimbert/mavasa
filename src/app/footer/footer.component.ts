import { Component, EventEmitter, Output } from '@angular/core';
import { faChevronUp,faLocationDot,faPhone,faEnvelope } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  arrowIcon = faChevronUp;
  locationIcon = faLocationDot;
  phoneIcon = faPhone;
  emailIcon = faEnvelope;
  @Output() dataFooterLoaded = new EventEmitter<string>();
  ngAfterViewInit() {
    this.dataFooterLoaded.emit('HeaderComponent');
  }
}
