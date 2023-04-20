import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { SkillHardService } from 'src/app/services/skill-hard.service';

@Component({
  selector: 'app-skill-add-edit',
  templateUrl: './skill-add-edit.component.html',
  styleUrls: ['./skill-add-edit.component.css']
})
export class SkillAddEditComponent {

  traerData: any;
  editar: any;
  addMode = true;
  id: any;

  ngOnInit() { }

  public formEdit = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    nombre: new FormControl('', Validators.compose([Validators.required])),
    porcentaje: new FormControl(0, Validators.compose([Validators.required, Validators.min(1), Validators.max(100),])),
    tipo: new FormControl('', Validators.compose([Validators.required])),
  });

  constructor(
    private FormBuilder: FormBuilder,
    private modalService: NgbModal,
    private skillHardService: SkillHardService
  ) { }

  @ViewChild('content') editview!: ElementRef;

  //metodos del add para tomar datos
  get Nombre() {
    return this.formEdit.get('nombre');
  }

  get Porcentaje() {
    return this.formEdit.get('porcentaje');
  }

  get Tipo() {
    return this.formEdit.get('tipo');
  }

  onGet(id: any) {
    this.id = this.skillHardService.verSkills(id);
    if (id === undefined) {
      this.addMode = true;
      this.formEdit.reset();
      console.log("paso 1");
    } else {
      this.addMode = false;
      this.skillHardService.verSkills(id).subscribe((data) => {
        this.traerData = data;
        console.log("paso 2");
        this.formEdit.setValue({
          id: this.traerData.id,
          nombre: this.traerData.nombre,
          porcentaje: this.traerData.porcentaje,
          tipo: this.traerData.tipo,
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
    if (this.formEdit.valid) {
      this.skillHardService.updateSkills(this.formEdit.getRawValue()).subscribe(data => {
        this.editar = data;
      })
      if (this.addMode) {
        alert("Skill agregada correctamente")
        window.location.reload();
      }
      if (!this.addMode) {
        alert("Skill editada correctamente")
        window.location.reload();
      }
    } else {
      alert("Error, intente nuevamente")
      this.formEdit.markAllAsTouched();
    }
  }

}
