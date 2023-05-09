import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Red } from '../model/red';

@Injectable({
  providedIn: 'root'
})
export class RedService {

  url = 'https://portfolio-backend-ltmx.onrender.com/redes/';

  constructor(private httpClient: HttpClient) { }

  public listRed(): Observable<Red[]> {
    return this.httpClient.get<Red[]>(this.url + 'list');
  }

  public verRed(id: number): Observable<Red> {
    return this.httpClient.get<Red>(this.url + `search/${id}`);
  }

  public agregarRed(red: Red): Observable<any> {
    return this.httpClient.post<any>(this.url + 'add', red);
  }

  public eliminarRed(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + `delete/${id}`);
  }

  public updateRed(red: Red): Observable<any> {
    return this.httpClient.put<any>(this.url + 'edit', red);
  }
}
