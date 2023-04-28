import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../model/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  url= 'http://localhost:8080/experiencias/';

  constructor(private httpClient:HttpClient) { }

  public listExperiencia(): Observable<Experiencia[]>{
    return this.httpClient.get<Experiencia[]>(this.url + 'list');
  }

  public verExperiencia(id:number): Observable<Experiencia>{
    return this.httpClient.get<Experiencia>(this.url + `search/${id}`);
  }

  public agregarExperiencia(experiencia: Experiencia): Observable<any>{
    return this.httpClient.post<any>(this.url + 'add', experiencia );
  }

  public eliminarExperiencia(id:number): Observable<any>{
    return this.httpClient.delete<any>(this.url + `delete/${id}`);
  }

  public updateExperiencia(experiencia:Experiencia): Observable<any>{
    return this.httpClient.put<any>(this.url + 'edit', experiencia);
  }
}
