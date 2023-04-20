import { Component } from '@angular/core';
import { SkillHard } from 'src/app/model/skill-hard';
import { SkillHardService } from 'src/app/services/skill-hard.service';


@Component({
  selector: 'app-skills-hard',
  templateUrl: './skills-hard.component.html',
  styleUrls: ['./skills-hard.component.css']
})
export class SkillsHardComponent {
  skills: SkillHard[]=[];

  constructor (private skillHardService: SkillHardService){}

  ngOnInit(): void{
    this.cargarSkill();}

    cargarSkill(): void{
      this.skillHardService.listSkills().subscribe(data =>{this.skills=data});
     }


     deleteSkill(id:number){
      if(confirm('¿Estas seguro que queres eliminar esta skill?')){
        this.skillHardService.eliminarSkills(id).subscribe(data =>{
          this.cargarSkill();})
      }
     }

}
