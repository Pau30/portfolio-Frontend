import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-contacto-add-edit',
  templateUrl: './contacto-add-edit.component.html',
  styleUrls: ['./contacto-add-edit.component.css']
})
export class ContactoAddEditComponent {
  traerData: any;
  editar: any;
  addMode = true;
  id: any;
  
  constructor(
    private modalService: NgbModal, private contactoService: ContactoService) { }

  //Da acceso al mismo elemento
  @ViewChild('content') editview!: ElementRef;


  ngOnInit() {
   }

 //Armado del Formgroup
 formEditContacto = new FormGroup({
  id: new FormControl({ value: 0, disabled: true }),
  email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
  mensaje: new FormControl('', Validators.compose([Validators.required])),

});


  //Metodos para tomar datos
  get Email() {
    return this.formEditContacto.get('email');
  }

  get Mensaje() {
    return this.formEditContacto.get('mensaje');
  }

  //Metodo para traer datos al modal
  onGet(id: any) {
    this.id = this.contactoService.verContacto(id);
    this.contactoService.verContacto(id).subscribe((data) => {
      this.traerData = data;
      this.formEditContacto.setValue({
        id: this.traerData.id,
        email: this.traerData.email,
        mensaje: this.traerData.mensaje,

      });
    }
    );
    this.abrir();
  }

  //Metodo para abrir el modal
  abrir() {
    this.modalService.open(this.editview)
      .result.then((result) => { }, (reason) => { }
      );
  }

  //Metodo para guardar los cambios o avisar si hay error
  onSave(event: Event) {
    event.preventDefault;
    if (this.formEditContacto.valid) {
      this.contactoService.updateContacto(this.formEditContacto.getRawValue()).subscribe(data => {
        this.editar = data;
        alert("Contacto editada correctamente")
        window.location.reload();
      })
    } else {
      alert("Error, intente nuevamente")
      this.formEditContacto.markAllAsTouched();
    }
}
}
