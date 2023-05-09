import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../model/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  url= 'https://portfolio-backend-ltmx.onrender.com/educacion/';

  constructor(private httpClient:HttpClient) { }

  public listEducacion(): Observable<Educacion[]>{
    return this.httpClient.get<Educacion[]>(this.url + 'list');
  }

  public verEducacion(id:number): Observable<Educacion>{
    return this.httpClient.get<Educacion>(this.url + `search/${id}`);
  }

  public agregarEducacion(educacion: Educacion): Observable<any>{
    return this.httpClient.post<any>(this.url + 'add', educacion );
  }

  public eliminarEducacion(id:number): Observable<any>{
    return this.httpClient.delete<any>(this.url + `delete/${id}`);
  }

  public updateEducacion(educacion:Educacion): Observable<any>{
    return this.httpClient.put<any>(this.url + 'edit', educacion);
  }
}
