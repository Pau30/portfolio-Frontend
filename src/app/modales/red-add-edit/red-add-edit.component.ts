import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RedService } from 'src/app/services/red.service';

@Component({
  selector: 'app-red-add-edit',
  templateUrl: './red-add-edit.component.html',
  styleUrls: ['./red-add-edit.component.css']
})
export class RedAddEditComponent {
  traerData: any;
  editar: any;
  addMode = true;
  id: any;

  ngOnInit() { }
  //Armado Formgroup
  public formAddEditRed = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    nombre: new FormControl('', Validators.compose([Validators.required])),
    icon: new FormControl('', Validators.compose([Validators.required])),
    link: new FormControl('', Validators.compose([Validators.required]))
  });

  constructor(
    private modalService: NgbModal, private redService: RedService) { }

  //Da acceso al mismo elemento
  @ViewChild('content') editview!: ElementRef;

  //Metodos del add para tomar datos
  get Nombre() {
    return this.formAddEditRed.get('nombre');
  }

  get Icon() {
    return this.formAddEditRed.get('icon');
  }

  get Link() {
    return this.formAddEditRed.get('link');
  }

  //Metodo para traer datos al modal
  onGet(id: any) {
    this.id = this.redService.verRed(id);
    if (id === undefined) {
      this.addMode = true;
      this.formAddEditRed.reset();
      console.log("paso1")
    } else {
      this.addMode = false;
      this.redService.verRed(id).subscribe((data) => {
        this.traerData = data;
        console.log("paso2")
        this.formAddEditRed.setValue({
          id: this.traerData.id,
          nombre: this.traerData.nombre,
          icon: this.traerData.icon,
          link: this.traerData.link,
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
    if (this.formAddEditRed.valid) {
      this.redService.updateRed(this.formAddEditRed.getRawValue()).subscribe(data => {
        this.editar = data;
      })
      if (this.addMode) {
        alert("Red agregado correctamente")
        window.location.reload();
      }
      if (!this.addMode) {
        alert("Red editado correctamente")
        window.location.reload();
      }
    } else {
      alert("Error, intente nuevamente")
      this.formAddEditRed.markAllAsTouched();
    }
  }

}
