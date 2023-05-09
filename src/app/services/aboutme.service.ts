import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona';


@Injectable({
  providedIn: 'root',
})
export class AboutmeService {
  //URL del backend

  url = 'https://portfolio-backend-ltmx.onrender.com/aboutme/';


  //Servicio para comunicarse con el backend
  constructor(private httpClient: HttpClient) {}

  //Metodos de la clase Persona

  public verPersona(id: number): Observable<Persona> {
    return this.httpClient.get<Persona>(this.url + `search/${id}`);
  }

  public updatePersona(persona: Persona): Observable<any> {
    return this.httpClient.put<any>(this.url + 'edit', persona);
  }


}
