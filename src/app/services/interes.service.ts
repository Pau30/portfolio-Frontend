import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interes } from '../model/interes';

@Injectable({
  providedIn: 'root'
})
export class InteresService {
  url = 'https://portfolio-backend-ltmx.onrender.com/intereses/';

  constructor(private httpClient: HttpClient) { }

  public listInteres(): Observable<Interes[]> {
    return this.httpClient.get<Interes[]>(this.url + 'list');
  }

  public verInteres(id: number): Observable<Interes> {
    return this.httpClient.get<Interes>(this.url + `search/${id}`);
  }

  public agregarInteres(interes: Interes): Observable<any> {
    return this.httpClient.post<any>(this.url + 'add', interes);
  }

  public eliminarInteres(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + `delete/${id}`);
  }

  public updateInteres(interes: Interes): Observable<any> {
    return this.httpClient.put<any>(this.url + 'edit', interes);
  }
}
