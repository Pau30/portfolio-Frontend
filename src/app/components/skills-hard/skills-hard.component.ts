import { Component, ViewChild, OnInit, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import { SkillAddEditComponent } from 'src/app/modales/skill-add-edit/skill-add-edit.component';
import { SkillHard } from 'src/app/model/skill-hard';
import { SkillHardService } from 'src/app/services/skill-hard.service';
import { TokenService } from 'src/app/services/token.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-skills-hard',
  templateUrl: './skills-hard.component.html',
  styleUrls: ['./skills-hard.component.css']
})

export class SkillsHardComponent implements OnInit, AfterViewInit {
  skills: SkillHard[] = [];
  loggedIn = false;
  id: any;

  constructor(private skillHardService: SkillHardService, private tokenService: TokenService, private el: ElementRef) { }
  //Permite tener acceso a las funciones del modal editar
  @ViewChild(SkillAddEditComponent) editView !: SkillAddEditComponent

  //Lo que se carga cuando se carga la pagina
  ngOnInit(): void {
    this.cargarSkill();
    //Booleano que oculta los botones de edicion, etc si el usuario no esta loggedIn
    if (this.tokenService.getToken()) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  //Metodo para cargar las skills
  cargarSkill(): void {
    this.skillHardService.listSkills().subscribe(data => { this.skills = data });
  }

  //Metodo para editar o agregar
  addEditSkill(id: any) {
    this.editView.onGet(id);
  }

  //Metodo para borrar
  deleteSkill(id: number) {
    if (confirm('¿Estas seguro que queres eliminar esta skill?')) {
      this.skillHardService.eliminarSkills(id).subscribe(data => {
        this.cargarSkill();
      })
    }
  }

  //Metodo drag and drop
  drop(event: CdkDragDrop<string[]>) {
    if(this.loggedIn = true){
    moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
  }}

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
    observer.observe(this.hardskill.nativeElement);
    observer.observe(this.hardskill1.nativeElement);
    observer.observe(this.hardskill2.nativeElement);
    observer.observe(this.hardskill3.nativeElement);
    observer.observe(this.hardskill4.nativeElement);
  }
  @ViewChild('hardskill') hardskill!: ElementRef;
  @ViewChild('hardskill1') hardskill1!: ElementRef;
  @ViewChild('hardskill2') hardskill2!: ElementRef;
  @ViewChild('hardskill3') hardskill3!: ElementRef;
  @ViewChild('hardskill4') hardskill4!: ElementRef;

}
