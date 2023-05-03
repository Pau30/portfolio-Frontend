import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProyeAddEditComponent } from 'src/app/modales/proye-add-edit/proye-add-edit.component';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  proyectos: Proyecto[] = [];
  loggedIn = false;
  id: any;

  //Permite tener acceso a las funciones del modal editar//
  @ViewChild(ProyeAddEditComponent) editProyectoView !: ProyeAddEditComponent

  constructor(private proyectoService: ProyectoService, private tokenService: TokenService) { }

  //Lo que se carga cuando se carga la pagina
  ngOnInit(): void {
    this.cargarSkillSoft();
    //Booleano que oculta los botones de edicion, etc si el usuario no esta loggedIn
    if (this.tokenService.getToken()) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  //Metodo para cargar las skills
  cargarSkillSoft(): void {
    this.proyectoService.listProyecto().subscribe(data => { this.proyectos = data });
  }

  //Metodo para editar o agregar
  addEditProyecto(id: any) {
    this.editProyectoView.onGet(id);
  }

  //Metodo para borrar
  deleteSkill(id: number) {
    if (confirm('¿Estas seguro que queres eliminar este proyecto?')) {
      this.proyectoService.eliminarProyecto(id).subscribe(data => {
        this.cargarSkillSoft();
      })
    }
  }

  //Metodo drag and drop
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.proyectos, event.previousIndex, event.currentIndex);
  }

  //Creacion del intersectionObserver para darle animacion a los elementos cuando aparecen
  ngAfterViewInit() {
    const threshold = 0.3;
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
    observer.observe(this.proyect.nativeElement);
    observer.observe(this.proyect1.nativeElement);
    observer.observe(this.proyect2.nativeElement);
  }
  @ViewChild('proyecto') proyect!: ElementRef;
  @ViewChild('proyecto1') proyect1!: ElementRef;
  @ViewChild('proyecto2') proyect2!: ElementRef;
}
