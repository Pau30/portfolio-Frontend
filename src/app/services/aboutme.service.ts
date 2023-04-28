import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Persona } from '../model/persona';


@Injectable({
  providedIn: 'root'
})
export class AboutmeService {

  //URL del backend

  url= 'http://localhost:8080/aboutme/';

  //Servicio para comunicarse con el backend
  constructor(private httpClient:HttpClient) { }

//Metodos de la clase Persona
  public listPersona(): Observable<Persona>{
    return this.httpClient.get<Persona>(this.url + 'list');
  }

  public verPersona(id:number): Observable<Persona>{
    return this.httpClient.get<Persona>(this.url + `search/${id}`);
  }

  public eliminarPersona(id:number): Observable<any>{
    return this.httpClient.delete<any>(this.url + `delete/${id}`);
  }

  public updatePersona(persona: Persona): Observable<any>{
    return this.httpClient.put<any>(this.url + 'edit', persona);
  }
}
