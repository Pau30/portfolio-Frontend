import { Component, ViewChild } from '@angular/core';
import { EduAddEditComponent } from 'src/app/modales/edu-add-edit/edu-add-edit.component';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/services/educacion.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent {
  //traer datos distintos datos del array
  edu: Educacion[] = [];
  selectedItem = 1;
  loggedIn = false;
  id: any;

  @ViewChild(EduAddEditComponent) editView !: EduAddEditComponent

  constructor(private educacionService: EducacionService, private tokenService: TokenService) { }

  ngOnInit(): void {

    this.cargarEducacion();
    if (this.tokenService.getToken()) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

  }
  cargarEducacion(): void {
    this.educacionService.listEducacion().subscribe(data => { this.edu = data });
  }

  seleccionado(id) {
    this.selectedItem = id;
  }

  addEditEducacion(id: any) {
    this.editView.onGet(id);
  }

  deleteEducacion(id: number) {
    if (confirm('¿Estas seguro que queres eliminar este estudio?')) {
      this.educacionService.eliminarEducacion(id).subscribe(data => {
        this.cargarEducacion();
      })
    }
  }

}
