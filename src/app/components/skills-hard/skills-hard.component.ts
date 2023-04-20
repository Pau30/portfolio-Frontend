import { Component, ViewChild } from '@angular/core';
import { SkillAddEditComponent } from 'src/app/modales/skill-add-edit/skill-add-edit.component';
import { SkillHard } from 'src/app/model/skill-hard';
import { SkillHardService } from 'src/app/services/skill-hard.service';


@Component({
  selector: 'app-skills-hard',
  templateUrl: './skills-hard.component.html',
  styleUrls: ['./skills-hard.component.css']
})
export class SkillsHardComponent {
  skills: SkillHard[]=[];
  loggedIn=false;
  id: any;

  constructor (private skillHardService: SkillHardService){}
//Permite tener acceso a las funciones del modal editar//
@ViewChild(SkillAddEditComponent) editView !:SkillAddEditComponent

  ngOnInit(): void{
    this.cargarSkill();}

    cargarSkill(): void{
      this.skillHardService.listSkills().subscribe(data =>{this.skills=data});
     }

     addEditSkill(id:any){
      this.editView.onGet(id);
      }

     deleteSkill(id:number){
      if(confirm('¿Estas seguro que queres eliminar esta skill?')){
        this.skillHardService.eliminarSkills(id).subscribe(data =>{
          this.cargarSkill();})
      }
     }

}
