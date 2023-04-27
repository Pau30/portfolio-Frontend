import { Component, ElementRef, ViewChild } from '@angular/core';
import { ExpeAddEditComponent } from 'src/app/modales/expe-add-edit/expe-add-edit.component';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent {

  //traer datos distintos datos del array
  experiencias: Experiencia[] = [];
  selectedItem = 1;
  loggedIn = false;
  id: any;

  //Permite tener acceso a las funciones del modal editar
  @ViewChild(ExpeAddEditComponent) editView !: ExpeAddEditComponent

  constructor(private experieciaService: ExperienciaService, private tokenService: TokenService) { }

  //Lo que se carga cuando se carga la pagina
  ngOnInit(): void {
    //Booleano que oculta los botones de edicion, etc si el usuario no esta loggedIn
    this.cargarExperiencia();
    if (this.tokenService.getToken()) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  //Metodo para cargar las experiencias
  cargarExperiencia(): void {
    this.experieciaService.listExperiencia().subscribe(data => { this.experiencias = data });
  }

  //Metodo para seleccionar la experiencia que aparece en pantalla
  seleccionado(id) {
    this.selectedItem = id;
  }

  //Metodo para editar o agregar
  addEditExperiencia(id: any) {
    this.editView.onGet(id);
  }

  //Metodo para borrar
  deleteExperiencia(id: number) {
    if (confirm('¿Estas seguro que queres eliminar este estudio?')) {
      this.experieciaService.eliminarExperiencia(id).subscribe(data => {
        this.cargarExperiencia();
      })
    }
  }

  //Creacion del intersectionObserver para darle animacion a los elementos cuando aparecen
  ngAfterViewInit() {
    const threshold = 0.5;
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
    observer.observe(this.expe.nativeElement);
    observer.observe(this.expe1.nativeElement);
    observer.observe(this.expe2.nativeElement);
    observer.observe(this.expe3.nativeElement);
  }
  @ViewChild('expe') expe!: ElementRef;
  @ViewChild('expe1') expe1!: ElementRef;
  @ViewChild('expe2') expe2!: ElementRef;
  @ViewChild('expe3') expe3!: ElementRef;
}


