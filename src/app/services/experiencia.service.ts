import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  url= 'http://localhost:8080/experiencia/';

  constructor(private httpClient:HttpClient) { }

  public listExperiencia(): Observable<Experiencia[]>{
    return this.httpClient.get<Experiencia[]>(this.url + 'lista');
  }

  public verExperiencia(id:number): Observable<Experiencia>{
    return this.httpClient.get<Experiencia>(this.url + `ver/${id}`);
  }

  public agregarExperiencia(experiencia: Experiencia): Observable<any>{
    return this.httpClient.post<any>(this.url + 'crear', experiencia );
  }

  public eliminarExperiencia(id:number): Observable<any>{
    return this.httpClient.delete<any>(this.url + `borrar/${id}`);
  }

  public updateExperiencia(experiencia:Experiencia): Observable<any>{
    return this.httpClient.put<any>(this.url + 'editar', experiencia);
  }
}
