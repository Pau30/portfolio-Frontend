import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutmeService } from 'src/app/services/aboutme.service';

@Component({
  selector: 'app-aboutme-add-edit',
  templateUrl: './aboutme-add-edit.component.html',
  styleUrls: ['./aboutme-add-edit.component.css']
})
export class AboutmeAddEditComponent {
  traerData: any;
  editar: any;
  addMode = true;
  id: any;
  formEditAbout:FormGroup;
 

  constructor(
    private modalService: NgbModal, private aboutMeService: AboutmeService, private fb: FormBuilder) { }

  //Da acceso al mismo elemento
  @ViewChild('content') editview!: ElementRef;


  ngOnInit() {
    //Armado del Formgroup
    this.formEditAbout = new FormGroup({
      id: new FormControl({ value: 0, disabled: true }),
      nombre: new FormControl('', Validators.compose([Validators.required])),
      imagen: new FormControl('', Validators.compose([Validators.required])),
      descripcion: new FormControl('', Validators.compose([Validators.required])),
    });
   }



  //Metodos para tomar datos
  get Nombre() {
    return this.formEditAbout.get('nombre');
  }

  get Imagen() {
    return this.formEditAbout.get('imagen');
  }

  get Descripcion() {
    return this.formEditAbout.get('descripcion');
  }


  //Metodo para traer datos al modal
  onGet(id: any) {
    this.id = this.aboutMeService.verPersona(id);
    this.aboutMeService.verPersona(id).subscribe((data) => {
      this.traerData = data;
      this.formEditAbout.setValue({
        id: this.traerData.id,
        nombre: this.traerData.nombre,
        descripcion: this.traerData.descripcion,
        imagen: this.traerData.imagen,
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
    if (this.formEditAbout.valid) {
      this.aboutMeService.updatePersona(this.formEditAbout.getRawValue()).subscribe(data => {
        this.editar = data;
        alert("Estudio editada correctamente")
        window.location.reload();
      })
    } else {
      alert("Error, intente nuevamente")
      this.formEditAbout.markAllAsTouched();
    }
  }



}
