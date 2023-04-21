import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  constructor(private tokenService:TokenService) { }



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // var currentUser = this.autenticacion.UsuarioAutenticado;
    let authReq=req;
    const token= this.tokenService.getToken();
    if (token !=null) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer'+token)

      })
    }

    return next.handle(authReq);
  }
}
