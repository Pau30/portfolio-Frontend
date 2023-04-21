import { Component, OnInit, ViewChild } from '@angular/core';
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
  loggedIn=false;
  id: any;

   //Permite tener acceso a las funciones del modal editar//
  @ViewChild(SkillSoftAddEditComponent) editSoftView !: SkillSoftAddEditComponent


  constructor(private skillSoftService: SkillSoftService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.cargarSkillSoft();
    if (this.tokenService.getToken()) {
      this.loggedIn = true;
    } else {
      this.loggedIn=false;
    }
    }

  cargarSkillSoft(): void {
    this.skillSoftService.listSkills().subscribe(data => { this.skillSoft = data });
  }

  addEditSkill(id:any){
    this.editSoftView.onGet(id);
    }

  deleteSkill(id: number) {
    if (confirm('¿Estas seguro que queres eliminar esta skill?')) {
      this.skillSoftService.eliminarSkills(id).subscribe(data => {
        this.cargarSkillSoft();
      })
    }
  }
}
