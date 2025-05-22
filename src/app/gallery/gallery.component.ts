import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {

  gallery = ['assets/imgs/photo1.jpeg','assets/imgs/photo2.jpeg','assets/imgs/photo3.jpeg','assets/imgs/photo4.jpeg','assets/imgs/photo5.jpeg',
  'assets/imgs/photo6.jpeg','assets/imgs/photo7.jpg','assets/imgs/photo8.jpg','assets/imgs/photo9.jpg','assets/imgs/photo10.jpg','assets/imgs/photo11.jpg',
  'assets/imgs/photo12.jpg','assets/imgs/photo13.jpg','assets/imgs/photo14.jpg','assets/imgs/photo15.jpg','assets/imgs/photo16.jpg','assets/imgs/photo17.jpg','assets/imgs/photo18.jpg','assets/imgs/photo19.jpg',
  'assets/imgs/photo20.jpg','assets/imgs/photo21.jpg','assets/imgs/photo22.jpg'];
  indexImageSelected :Number;
  previousIndexImageSelected :Number;

  @Output() dataGalleryLoaded = new EventEmitter<string>();
  ngAfterViewInit() {
    /*const gallerySection = document.getElementById('gallery');
    if(gallerySection != null){
      gallerySection.style.height = window.innerHeight + 'px';
    }*/
    this.dataGalleryLoaded.emit('GalleryComponent');
  }
  onResizeGalleryView() {
    const gallerySection = document.getElementById('gallery');
    if(gallerySection != null){
      gallerySection.style.height = window.innerHeight + 'px';
    }
  }
  getPhotoStyle(gallery:any){
    return {'background-image':'url("'+gallery+'")'};
  }
  openCarousel(photo:any,i:any){
    /*const IS_DIFFERENT_IMAGE_ACTIVATED = this.previousIndexImageSelected != i;
    if(IS_DIFFERENT_IMAGE_ACTIVATED){
      const ACTIVE_PHOTOS = document.querySelectorAll('.carousel-item.active');
      ACTIVE_PHOTOS.forEach(element => {
        element.classList.remove('active');
      });
    }*/
    this.indexImageSelected = i;
    let carousel = document.getElementById('carousel');
    if(carousel != null){
      carousel.classList.remove('gallery-carousel--hidden');
      carousel.classList.add('gallery-carousel--show');
    }
    //this.previousIndexImageSelected = this.indexImageSelected;
  }
  closeCarousel(){
    document.getElementById('carousel')?.classList.add('gallery-carousel--hidden');
    document.getElementById('carousel')?.classList.remove('gallery-carousel--show');
    this.indexImageSelected = -1;
    const ACTIVE_PHOTOS = document.querySelectorAll('.carousel-item.active');
    ACTIVE_PHOTOS.forEach(element => {
      element.classList.remove('active');
    });
    //this.indexImageSelected = 0;
  }
  onElementVisibleGallery(element:HTMLElement){
    element.classList.add('gallery__photo--show');
  }
}
