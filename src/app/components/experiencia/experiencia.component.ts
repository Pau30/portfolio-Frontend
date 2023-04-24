import { Component, ViewChild } from '@angular/core';
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
experiencias: Experiencia[]=[];
selectedItem=1;
loggedIn=false;
id:any;

@ViewChild(ExpeAddEditComponent) editView !:ExpeAddEditComponent

constructor (private experieciaService:ExperienciaService, private tokenService:TokenService) {}

 ngOnInit(): void{

 this.cargarExperiencia();
 if (this.tokenService.getToken()) {
  this.loggedIn = true;
} else {
  this.loggedIn=false;
}

}
cargarExperiencia(): void{
  this.experieciaService.listExperiencia().subscribe(data =>{this.experiencias=data});
 }

 seleccionado(id){
  this.selectedItem = id;
 }

 addEditExperiencia(id:any){
  this.editView.onGet(id);
 }

  deleteExperiencia(id:number){
   if(confirm('¿Estas seguro que queres eliminar este estudio?')){
     this.experieciaService.eliminarExperiencia(id).subscribe(data =>{
       this.cargarExperiencia();})
   }
  }
}
