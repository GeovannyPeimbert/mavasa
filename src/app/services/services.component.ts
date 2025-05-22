import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {

  services = [
    {
      'title':'Fabricación',
      'imageURL':'assets/imgs/photo19.jpg',
      'description':'Elaboramos mobiliario de alta gama, así como estructuras metálicas en acero al carbón y acero inoxidable, mobiliario retail, racks industriales para almacenaje.'
    },
    {
      'title':'Corte Láser',
      'imageURL':'assets/imgs/photo23.jpg',
      'description':'Ofrecemos servicio de corte con láser, cortes perfectos con calidad del borde y velocidad y rentabilidad. Cortamos acero al carbón, acero inoxidable, acero galvanizado y aluminio.'
    },
    {
      'title':'Doblez de Lámina/Placa',
      'imageURL':'assets/imgs/photo24.jpg',
      'description':'Contamos con equipo altamente capacitado y maquinaria de última generación para realizar dobleces precisos. Elaboramos desde proyectos estándar hasta diseños personalizados.'
    },
    {
      'title':'Soldadura y Acabados especiales',
      'imageURL':'assets/imgs/photo25.jpg',
      'description':'Ofrecemos servicio de soldadura, con alta calidad y precisión en Argón, Microalambre, Aluminio, Latón, siempre cuidando su proyecto. Contamos con una amplia variedad de acabados latonados, cromados, niquelados y acabados en pintura horneada en polvo (electrostática).'
    }
  ]

  @Output() dataServicesLoaded = new EventEmitter<string>();
  ngAfterViewInit() {
    /*const servicesSection = document.getElementById('services');
    if(servicesSection != null){
      servicesSection.style.minHeight = window.innerHeight + 'px';
    }*/
    this.dataServicesLoaded.emit('ServicesComponent');
  }
  onResizeServicesView() {
    /*Array.from(document.getElementsByClassName('services__service')).forEach(element => {
      element.classList.remove('services--show');
    });*/
    const servicesSection = document.getElementById('services');
    if(servicesSection != null){
      servicesSection.style.minHeight = window.innerHeight + 'px';
    }
  }
  getServiceStyle(service:any){
    return {'background-image':'url("'+service.imageURL+'")',
            'background-position':'center',
            'background-size':'cover',
            'border-top-right-radius':'15px',
            'border-top-left-radius':'15px'};
  }
  onElementVisibleServices(element:HTMLElement){
    element.classList.add('services--show');
  }
}
