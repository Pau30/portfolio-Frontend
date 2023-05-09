import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contacto } from '../model/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  //URL del backend

  url = 'https://portfolio-backend-ltmx.onrender.com/contacto/';


  //Servicio para comunicarse con el backend
  constructor(private httpClient: HttpClient) {}

  //Metodos de la clase Persona

  public verContacto(id: number): Observable<Contacto> {
    return this.httpClient.get<Contacto>(this.url + `search/${id}`);
  }

  public updateContacto(contacto: Contacto): Observable<any> {
    return this.httpClient.put<any>(this.url + 'edit', contacto);
  }

}
