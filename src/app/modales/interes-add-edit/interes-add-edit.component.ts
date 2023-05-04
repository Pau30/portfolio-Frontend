import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InteresService } from 'src/app/services/interes.service';

@Component({
  selector: 'app-interes-add-edit',
  templateUrl: './interes-add-edit.component.html',
  styleUrls: ['./interes-add-edit.component.css']
})
export class InteresAddEditComponent {
  traerData: any;
  editar: any;
  addMode = true;
  id: any;

  ngOnInit() { }
  //Armado Formgroup
  public formAddEditInt = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    nombre: new FormControl('', Validators.compose([Validators.required])),
    icon: new FormControl('', Validators.compose([Validators.required])),
  });

  constructor(
    private modalService: NgbModal,
    private interesService: InteresService
  ) { }

  //Da acceso al mismo elemento
  @ViewChild('content') editview!: ElementRef;

  //Metodos del add para tomar datos
  get Nombre() {
    return this.formAddEditInt.get('nombre');
  }

  get Icon() {
    return this.formAddEditInt.get('icon');
  }



  //Metodo para traer datos al modal
  onGet(id: any) {
    this.id = this.interesService.verInteres(id);
    if (id === undefined) {
      this.addMode = true;
      this.formAddEditInt.reset();
      console.log("paso 1");
    } else {
      this.addMode = false;
      this.interesService.verInteres(id).subscribe((data) => {
        this.traerData = data;
        console.log("paso 2");
        this.formAddEditInt.setValue({
          id: this.traerData.id,
          nombre: this.traerData.nombre,
          icon: this.traerData.icon,
        });
      }
      )
    };
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
    if (this.formAddEditInt.valid) {
      this.interesService.updateInteres(this.formAddEditInt.getRawValue()).subscribe(data => {
        this.editar = data;
      })
      if (this.addMode) {
        alert("Icono agregado correctamente")
        window.location.reload();
      }
      if (!this.addMode) {
        alert("Icono editado correctamente")
        window.location.reload();
      }
    } else {
      alert("Error, intente nuevamente")
      this.formAddEditInt.markAllAsTouched();
    }
  }

}
