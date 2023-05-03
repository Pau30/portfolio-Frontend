import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SkillSoftAddEditComponent } from 'src/app/modales/skill-soft-add-edit/skill-soft-add-edit.component';
import { SkillSoft } from 'src/app/model/skill-soft';
import { SkillSoftService } from 'src/app/services/skill-soft.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-skills-soft',
  templateUrl: './skills-soft.component.html',
  styleUrls: ['./skills-soft.component.css']
})
export class SkillsSoftComponent {
  skillSoft: SkillSoft[] = [];
  loggedIn = false;
  id: any;

  //Permite tener acceso a las funciones del modal editar//
  @ViewChild(SkillSoftAddEditComponent) editSoftView !: SkillSoftAddEditComponent

  constructor(private skillSoftService: SkillSoftService, private tokenService: TokenService) { }

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
    this.skillSoftService.listSkills().subscribe(data => { this.skillSoft = data });
  }

  //Metodo para editar o agregar
  addEditSkill(id: any) {
    this.editSoftView.onGet(id);
  }

  //Metodo para borrar
  deleteSkill(id: number) {
    if (confirm('¿Estas seguro que queres eliminar esta skill?')) {
      this.skillSoftService.eliminarSkills(id).subscribe(data => {
        this.cargarSkillSoft();
      })
    }
  }

  //Metodo drag and drop
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.skillSoft, event.previousIndex, event.currentIndex);
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
    observer.observe(this.softskills.nativeElement);
    observer.observe(this.softskills1.nativeElement);
    observer.observe(this.softskills2.nativeElement);
  }
  @ViewChild('softskills') softskills!: ElementRef;
  @ViewChild('softskills1') softskills1!: ElementRef;
  @ViewChild('softskills2') softskills2!: ElementRef;
}
