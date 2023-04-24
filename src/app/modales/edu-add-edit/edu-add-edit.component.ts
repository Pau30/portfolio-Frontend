import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-edu-add-edit',
  templateUrl: './edu-add-edit.component.html',
  styleUrls: ['./edu-add-edit.component.css']
})
export class EduAddEditComponent {

  traerData: any;
  editar: any;
  addMode = true;
  id: any;

  public formAddEditEdu = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    nombre: new FormControl('', Validators.compose([Validators.required])),
    logo: new FormControl('', Validators.compose([Validators.required])),
    inicio: new FormControl(null, Validators.compose([Validators.required])),
    fin: new FormControl(null, Validators.compose([Validators.required])),
    descripcion: new FormControl('', Validators.compose([Validators.required])),
  });



  @ViewChild('content') editview!: ElementRef;

  //Constructor
  constructor(
    private modalService: NgbModal,
    private educacionService: EducacionService
  ) { }

  get Nombre() {
    return this.formAddEditEdu.get('nombre');
  }

  get Logo() {
    return this.formAddEditEdu.get('logo');
  }

  get Inicio() {
    return this.formAddEditEdu.get('inicio');
  }

  get Fin() {
    return this.formAddEditEdu.get('fin');
  }

  get Descripcion() {
    return this.formAddEditEdu.get('descripcion');
  }

  onGet(id: any) {
    this.id = this.educacionService.verEducacion(id);
    if (id === undefined) {
      this.addMode = true;
      this.formAddEditEdu.reset();
      console.log("paso 1");
    } else {
      this.addMode = false;
      this.educacionService.verEducacion(id).subscribe((data) => {
        this.traerData = data;
        console.log("paso 2");
        this.formAddEditEdu.setValue({
          id: this.traerData.id,
          nombre: this.traerData.nombre,
          inicio: this.traerData.inicio,
          fin: this.traerData.fin,
          descripcion: this.traerData.descripcion,
          logo: this.traerData.logo,
        });
      }
      )
    };
    this.abrir();
  }

  abrir() {
    this.modalService.open(this.editview)
      .result.then((result) => { }, (reason) => { }
      );
  }

  onSave(event: Event) {
    //evita que se ejecute el submit
    event.preventDefault;
    if (this.formAddEditEdu.valid) {
      this.educacionService.updateEducacion(this.formAddEditEdu.getRawValue()).subscribe(data => {
        this.editar = data;
      })
      if (this.addMode) {
        alert("Estudio agregada correctamente")
        window.location.reload();
      }
      if (!this.addMode) {
        alert("Estudio editada correctamente")
        window.location.reload();
      }
    } else {
      alert("Error, intente nuevamente")
      this.formAddEditEdu.markAllAsTouched();
    }
  }

  
}
