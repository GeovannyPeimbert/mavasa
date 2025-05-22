import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder  } from '@angular/forms';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import '../../assets/js/smtp.js';
declare let Email:any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  loadingIcon = faGear;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.contactForm = this.fb.group({
       name: [''],
       surname: [''],
       email: [''],
       phone:[''],
       doubts:['']
    });
  }

  @Output() dataContactLoaded = new EventEmitter<string>();
  ngAfterViewInit() {
    /*const contactSection = document.getElementById('contact');
    if(contactSection != null){
      contactSection.style.height = window.innerHeight + 'px';
    }*/
    this.dataContactLoaded.emit('ContactComponent');
  }
  onResizeContactView() {
    const contactSection = document.getElementById('contact');
    if(contactSection != null){
      contactSection.style.height = window.innerHeight + 'px';
    }
  }
  sendEmail(){
    console.log('DATA');
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    form.classList.add('was-validated');
    if (form.checkValidity() !== false) {
      const SURNAME  = this.contactForm.get('surname')?.value != ''?this.contactForm.get('surname')?.value:'No se registró información';
      const EMAIL = this.contactForm.get('email')?.value != ''?this.contactForm.get('email')?.value:'No se registró información';
      const BODY = `<b>Nombre:</b> ${this.contactForm.get('name')?.value} <br> 
        <b>Apellido(s):</b> ${SURNAME} <br> 
        <b>Correo electrónico:</b> ${EMAIL} <br> 
        <b>Teléfono celular:</b> ${this.contactForm.get('phone')?.value} <br> 
        <b>Asunto:</b> ${this.contactForm.get('doubts')?.value}`;
      let email = {
        'secureToken':'8bd305de-af27-413e-99ce-04992d6f7bc1',
        'to':'contacto.mavasa@gmail.com',
        'from':'noreplymavasacompany@gmail.com',
        'subject':'Captación de nuevo prospecto - NO RESPONDER',
        'body':BODY
      }
      Swal.fire({
        title: 'Enviando información.',
        allowEscapeKey: false,
        allowOutsideClick: false
      });
      Swal.showLoading();
      Email.send({
        SecureToken:email.secureToken,
        To:email.to,
        From:email.from,
        Subject:email.subject,
        Body:email.body
      }).then(
        (message: any) => {
          console.log(message);
          if(message === 'OK'){
            Swal.fire({
              title: "Envío de información exitoso.",
              text: 'Se ha enviado la información correctamente, a la brevedad nos comunicaremos con usted.',
              icon: "success",
              confirmButtonText: "Aceptar",
            })
          }else{
            Swal.fire({
              title: "Envío fallido.",
              text: "Ha ocurrido un problema al enviar la información, favor de intentarlo más tarde o de ponerse en contacto con nosotros a través de nuestras demás redes.",
              icon: "error",
              confirmButtonText: "Aceptar",
            })
          }
        }
      );
    }
  }
}