import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-proye-add-edit',
  templateUrl: './proye-add-edit.component.html',
  styleUrls: ['./proye-add-edit.component.css']
})
export class ProyeAddEditComponent {
  traerData: any;
  editar: any;
  addMode = true;
  id: any;

  ngOnInit() { }

  //Armado del Formgroup
  public formEditProyecto = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    nombre: new FormControl<string>('', Validators.compose([Validators.required])),
    imagen: new FormControl('', Validators.compose([Validators.required])),
    descripcion: new FormControl('', Validators.compose([Validators.required])),
    link: new FormControl('', Validators.compose([Validators.required])),
    anio: new FormControl(null, Validators.compose([Validators.required])),
  });

  constructor(
    private modalService: NgbModal,
    private proyectoService: ProyectoService
  ) { }

  //Da acceso al mismo elemento
  @ViewChild('content') editProyect!: ElementRef;

  //Metodos para tomar datos
  get Nombre() {
    return this.formEditProyecto.get('nombre');
  }

  get Imagen() {
    return this.formEditProyecto.get('imagen');
  }

  get Descripcion() {
    return this.formEditProyecto.get('descripcion');
  }

  get Link() {
    return this.formEditProyecto.get('link');
  }

  get Anio() {
    return this.formEditProyecto.get('anio');
  }

  //Metodo para traer datos al modal
  onGet(id: any) {
    this.id = this.proyectoService.verProyecto(id);
    if (id === undefined) {
      this.addMode = true;
      this.formEditProyecto.reset();
    } else {
      this.addMode = false;
      this.proyectoService.verProyecto(id).subscribe((data) => {
        this.traerData = data;
        this.formEditProyecto.setValue({
          id: this.traerData.id,
          nombre: this.traerData.nombre,
          imagen: this.traerData.imagen,
          descripcion: this.traerData.descripcion,
          link:this.traerData.link,
          anio:this.traerData.anio
        });
      }
      )
    };
    this.abrir();
  }

  //Metodo para abrir el modal
  abrir() {
    this.modalService.open(this.editProyect)
      .result.then((result) => { }, (reason) => { }
      );
  }

  //Metodo para guardar los cambios o avisar si hay error

  onSave(event: Event) {
    event.preventDefault;
    if (this.formEditProyecto.valid) {
      this.proyectoService.updateProyecto(this.formEditProyecto.getRawValue()).subscribe(data => {
        this.editar = data;
      })
      if (this.addMode) {
        alert("Proyecto agregado correctamente")
        window.location.reload();
      }
      if (!this.addMode) {
        alert("Proyecto editado correctamente")
        window.location.reload();
      }
    } else {
      alert("Error, intente nuevamente")
      this.formEditProyecto.markAllAsTouched();
    }
  }
}
