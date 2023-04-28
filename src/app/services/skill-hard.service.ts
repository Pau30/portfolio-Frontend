import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillHard } from 'src/app/model/skill-hard';

@Injectable({
  providedIn: 'root'
})
export class SkillHardService {
  url= 'http://localhost:8080/hardSkills/';

  constructor(private httpClient:HttpClient) { }

  public listSkills(): Observable<SkillHard[]>{
    return this.httpClient.get<SkillHard[]>(this.url + 'list');
  }

  public verSkills(id:number): Observable<SkillHard>{
    return this.httpClient.get<SkillHard>(this.url + `search/${id}`);
  }

  public agregarSkills(skill: SkillHard): Observable<any>{
    return this.httpClient.post<any>(this.url + 'add', skill );
  }

  public eliminarSkills(id:number): Observable<any>{
    return this.httpClient.delete<any>(this.url + `delete/${id}`);
  }

  public updateSkills(skill:SkillHard): Observable<any>{
    return this.httpClient.put<any>(this.url + 'edit', skill);
  }
}
