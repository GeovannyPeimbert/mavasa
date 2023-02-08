import { Component, NgModule } from '@angular/core';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
    title = 'mavasa';
    loadingIcon = faGear;
    childrenDataLoadedCount = 0;
    
    dataLoaded(child: string) {
      this.childrenDataLoadedCount++;
      if (this.childrenDataLoadedCount === 3) {
        // here all children load data
        $('#loading-page').fadeOut();
      }
    }
}
