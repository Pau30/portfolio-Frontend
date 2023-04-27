import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-expe-add-edit',
  templateUrl: './expe-add-edit.component.html',
  styleUrls: ['./expe-add-edit.component.css']
})
export class ExpeAddEditComponent {
  traerData: any;
  editar: any;
  addMode = true;
  id: any;

  public formAddEditExpe = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    nombre: new FormControl('', Validators.compose([Validators.required])),
    puesto: new FormControl('', Validators.compose([Validators.required])),
    logo: new FormControl('', Validators.compose([Validators.required])),
    inicio: new FormControl('', Validators.compose([Validators.required])),
    fin: new FormControl('', Validators.compose([Validators.required])),
    descripcion: new FormControl('', Validators.compose([Validators.required])),
   
  });

  @ViewChild('content') editview!: ElementRef;

  //Constructor
  constructor(
    private modalService: NgbModal,
    private experienciaService: ExperienciaService
  ) { }

  get Nombre() {
    return this.formAddEditExpe.get('nombre');
  }

  get Puesto() {
    return this.formAddEditExpe.get('puesto');
  }

  get Logo() {
    return this.formAddEditExpe.get('logo');
  }

  get Inicio() {
    return this.formAddEditExpe.get('inicio');
  }

  get Fin() {
    return this.formAddEditExpe.get('fin');
  }

  get Descripcion() {
    return this.formAddEditExpe.get('descripcion');
  }

  onGet(id: any) {
    this.id = this.experienciaService.verExperiencia(id);
    if (id === undefined) {
      this.addMode = true;
      this.formAddEditExpe.reset();
    } else {
      this.addMode = false;
      this.experienciaService.verExperiencia(id).subscribe((data) => {
        this.traerData = data;
        this.formAddEditExpe.setValue({
          id: this.traerData.id,
          nombre: this.traerData.nombre,
          puesto: this.traerData.puesto,
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
    if (this.formAddEditExpe.valid) {
      this.experienciaService.updateExperiencia(this.formAddEditExpe.getRawValue()).subscribe(data => {
        this.editar = data;
      })
      if (this.addMode) {
        alert("Experiencia agregada correctamente")
        window.location.reload();
      }
      if (!this.addMode) {
        alert("Experiencia editada correctamente")
        window.location.reload();
      }
    } else {
      alert("Error, intente nuevamente")
      this.formAddEditExpe.markAllAsTouched();
    }
  }

}
