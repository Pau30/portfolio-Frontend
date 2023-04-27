import { Component, ElementRef, ViewChild } from '@angular/core';
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
  estudios: Educacion[] = [];
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
    this.educacionService.listEducacion().subscribe(data => { this.estudios = data });
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
    observer.observe(this.edu.nativeElement);
    observer.observe(this.edu1.nativeElement);
    observer.observe(this.edu2.nativeElement);
    observer.observe(this.edu3.nativeElement);
  }
  @ViewChild('edu') edu!: ElementRef;
  @ViewChild('edu1') edu1!: ElementRef;
  @ViewChild('edu2') edu2!: ElementRef;
  @ViewChild('edu3') edu3!: ElementRef;

}
