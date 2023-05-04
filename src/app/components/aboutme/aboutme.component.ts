import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AboutmeAddEditComponent } from 'src/app/modales/aboutme-add-edit/aboutme-add-edit.component';
import { InteresAddEditComponent } from 'src/app/modales/interes-add-edit/interes-add-edit.component';
import { Interes } from 'src/app/model/interes';
import { Persona } from 'src/app/model/persona';
import { AboutmeService } from 'src/app/services/aboutme.service';
import { InteresService } from 'src/app/services/interes.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent {
  persona: Persona = new Persona("", "", "");
  intereses: Interes[]=[];
  id:any;
  loggedIn = false;

  //Permite tener acceso a las funciones del modal editar
  @ViewChild(AboutmeAddEditComponent) editView !: AboutmeAddEditComponent
  @ViewChild(InteresAddEditComponent) editintView !: InteresAddEditComponent

  constructor(private aboutmeService: AboutmeService, private interesService:InteresService, private tokenService: TokenService) { }

  ngOnInit(): void {

    this.cargarPersona(1);
    this.cargarInteres();
    if (this.tokenService.getToken()) {
      console.log("Logeado");
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  cargarPersona(id: number): void {
    this.aboutmeService.verPersona(id).subscribe(data => { this.persona = data });
  }

 cargarInteres(): void {
  this.interesService.listInteres().subscribe(data => { this.intereses = data });
}

  //Metodo para editar persona
  EditPersona(id: any) {
    this.editView.onGet(id);
  }

 //Metodo para editar o agregar
 addEditInteres(id: any) {
  this.editintView.onGet(id);
}

//Metodo para borrar
deleteInteres(id: number) {
  if (confirm('¿Estas seguro que queres eliminar este hobby?')) {
    this.interesService.eliminarInteres(id).subscribe(data => {
      this.cargarInteres();
    })
  }
}

 //Metodo drag and drop
 drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.intereses, event.previousIndex, event.currentIndex);
}

  //Creacion del intersectionObserver para darle animacion a los elementos cuando aparecen
  ngAfterViewInit() {
    const threshold = 0.4;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fadeIn')
          }
          else {
            if (entry.intersectionRatio > 0)
              entry.target.classList.remove('fadeIn');
          }
        });
      },
      { threshold }
    );
    observer.observe(this.about.nativeElement);
    observer.observe(this.about1.nativeElement);
    observer.observe(this.about2.nativeElement);
    observer.observe(this.about3.nativeElement);
  }
  @ViewChild('about') about!: ElementRef;
  @ViewChild('about') about1!: ElementRef;
  @ViewChild('about2') about2!: ElementRef;
  @ViewChild('about3') about3!: ElementRef;

}
