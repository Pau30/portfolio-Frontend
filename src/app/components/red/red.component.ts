import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ViewChild } from '@angular/core';
import { RedAddEditComponent } from 'src/app/modales/red-add-edit/red-add-edit.component';
import { Red } from 'src/app/model/red';
import { RedService } from 'src/app/services/red.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-red',
  templateUrl: './red.component.html',
  styleUrls: ['./red.component.css']
})
export class RedComponent {
  redes: Red[] = [];
  id: any;
  loggedIn = false;

  //Permite tener acceso a las funciones del modal editar
  @ViewChild(RedAddEditComponent) editRedView !: RedAddEditComponent


  constructor(private redService: RedService, private tokenService: TokenService) { }
  //Lo que se carga cuando se carga la pagina
  ngOnInit(): void {
    this.cargarRed();
    //Booleano que oculta los botones de edicion, etc si el usuario no esta loggedIn
    if (this.tokenService.getToken()) {
      console.log("Logeado");
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  //Metodo para cargar las redes sociales
  cargarRed(): void {
    this.redService.listRed().subscribe(data => { this.redes = data });
  }

  //Metodo para editar o agregar
  addEditRedes(id: any) {
    this.editRedView.onGet(id);
  }

  //Metodo para borrar
  deleteRedes(id: number) {
    if (confirm('¿Estas seguro que queres eliminar esta red?')) {
      this.redService.eliminarRed(id).subscribe(data => {
        this.cargarRed();
      })
    }
  }

  //Metodo drag and drop
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.redes, event.previousIndex, event.currentIndex);
  }

}
