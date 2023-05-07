import { Component, ViewChild } from '@angular/core';
import { ContactoAddEditComponent } from 'src/app/modales/contacto-add-edit/contacto-add-edit.component';
import { Contacto } from 'src/app/model/contacto';
import { ContactoService } from 'src/app/services/contacto.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  contacto: Contacto = new Contacto("", "");
  id: any;
  loggedIn = false;

  //Permite tener acceso a las funciones del modal editar
  @ViewChild(ContactoAddEditComponent) editView !: ContactoAddEditComponent


  constructor(private contactoService: ContactoService, private tokenService: TokenService) { }
  //Lo que se carga cuando se carga la pagina
  ngOnInit(): void {
    this.cargarContacto(1);
    //Booleano que oculta los botones de edicion, etc si el usuario no esta loggedIn
    if (this.tokenService.getToken()) {
      console.log("Logeado");
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }
//Metodo para cargar los datos de contacto
  cargarContacto(id: number): void {
    this.contactoService.verContacto(id).subscribe(data => { this.contacto = data });
  }

  //Metodo para editar contacto
  editContacto(id: any) {
    this.editView.onGet(id);
  }

}
