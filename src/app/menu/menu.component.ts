import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit{
  @Output() dataMenuLoaded = new EventEmitter<string>();
  ngAfterViewInit() {
    this.dataMenuLoaded.emit('MenuComponent');
  }
  changeMenuStyle() {
    let menu = document.getElementById("menu");
    if(menu != null){
      if(menu.classList.contains("mavasa__menu--showed")){
        menu.classList.remove("mavasa__menu--showed");
      }else{
        menu.classList.add("mavasa__menu--showed");
      }
    }
  }
}
