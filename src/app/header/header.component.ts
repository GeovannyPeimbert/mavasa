import { AfterViewInit, Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit{

  homeElement : any;
  aboutElement : any;
  servicesElement : any;
  contactElement : any;
  galleryElement : any
  currentActive = 1;
  homeOffset : number = 0;
  aboutOffset : number = 0;
  servicesOffset : number = 0;
  contactOffset : number = 0;
  galleryOffset : number = 0;

  @Output() dataHeaderLoaded = new EventEmitter<string>();
  ngAfterViewInit() {
    this.dataHeaderLoaded.emit('HeaderComponent');
    this.homeElement = document.getElementById('home');
    this.aboutElement = document.getElementById('about');
    this.servicesElement = document.getElementById('services');
    this.contactElement = document.getElementById('contact');
    this.galleryElement = document.getElementById('gallery');
    this.homeOffset = this.homeElement.offsetTop;
    this.aboutOffset = this.aboutElement.offsetTop;
    this.servicesOffset = this.servicesElement.offsetTop;
    this.contactOffset = this.contactElement.offsetTop;
    this.galleryOffset = this.galleryElement.offsetTop;
  }

  @HostListener('window:scroll',['$event'])
  checkOffsetTop(){
    let element = document.querySelector('.navbar') as HTMLElement;
    let match = window.matchMedia;
    let isMobile = false;
    if(match){
      let mq = match("(pointer:coarse)");
      isMobile = mq.matches;
    }
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('header--show');
    } else {
      if(isMobile){
        let navbar = document.getElementsByClassName('collapse show');
        if(navbar.length == 0){
          element.classList.remove('header--show');
        }
      }else{
        element.classList.remove('header--show');
      }
    }
    if (window.pageYOffset >= this.homeOffset && window.pageYOffset < this.aboutOffset) {
      this.currentActive = 1;
    } else if (window.pageYOffset >= this.aboutOffset && window.pageYOffset < this.servicesOffset) {
      this.currentActive = 2;
    } else if (window.pageYOffset >= this.servicesOffset && window.pageYOffset < this.contactOffset) {
      this.currentActive = 3;
    } else if(window.pageYOffset >= this.contactOffset && window.pageYOffset < this.galleryOffset){
      this.currentActive = 4;
    } else if (window.pageYOffset >= this.galleryOffset) {
      this.currentActive = 5;
    } else {
      this.currentActive = 1;
    }
  }


  changeheaderStyle() {
    if(window.pageYOffset >= this.homeOffset && window.pageYOffset < this.aboutOffset){
      let header = document.getElementById("header");
      if(header != null){
        if(header.classList.contains("header--show")){
          header.classList.remove("header--show");
        }else{
          header.classList.add("header--show");
        }
      }
    }
  }
  changeMenuSelected(e:any){
    if(document.getElementsByClassName('header__option--selected') != null){
      document.getElementsByClassName('header__option--selected')[0]?.classList.remove("header__option--selected");
      e.target?.classList.add("header__option--selected");
    }
  }
  /*onWindowScroll(e:any) {
    let element = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('header--show');
    } else {
      element.classList.remove('header--show');
    }
  }*/
}
