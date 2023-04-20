import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillSoft } from '../model/skill-soft';

@Injectable({
  providedIn: 'root'
})
export class SkillSoftService {

  url= 'http://localhost:8080/skillsoft/';

constructor(private httpClient:HttpClient) { }

public listSkills(): Observable<SkillSoft[]>{
  return this.httpClient.get<SkillSoft[]>(this.url + 'lista');
}

public verSkills(id:number): Observable<SkillSoft>{
  return this.httpClient.get<SkillSoft>(this.url + `ver/${id}`);
}

public agregarSkills(skillSoft: SkillSoft): Observable<any>{
  return this.httpClient.post<any>(this.url + 'crear', skillSoft );
}

public eliminarSkills(id:number): Observable<any>{
  return this.httpClient.delete<any>(this.url + `borrar/${id}`);
}

public updateSkills(skillSoft:SkillSoft): Observable<any>{
  return this.httpClient.put<any>(this.url + 'editar', skillSoft);
}
}