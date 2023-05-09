import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../model/proyecto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  url = 'https://portfolio-backend-ltmx.onrender.com/proyectos/';

  constructor(private httpClient: HttpClient) { }

  public listProyecto(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(this.url + 'list');
  }

  public verProyecto(id: number): Observable<Proyecto> {
    return this.httpClient.get<Proyecto>(this.url + `search/${id}`);
  }

  public agregarProyecto(proyecto: Proyecto): Observable<any> {
    return this.httpClient.post<any>(this.url + 'add', proyecto);
  }

  public eliminarProyecto(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + `delete/${id}`);
  }

  public updateProyecto(proyecto: Proyecto): Observable<any> {
    return this.httpClient.put<any>(this.url + 'edit', proyecto);
  }
}
