import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public logform = new FormGroup({
    nombreUsuario: new FormControl('', Validators.compose([Validators.required])),
    password: new FormControl('', Validators.compose([Validators.required])),
  });

  loggedIn = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: '';
  password: '';
  roles:string[] = [];



  constructor(private modalService: NgbModal, private tokenService:TokenService, private authService:AuthenticationService) { }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.loggedIn = true;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  @ViewChild('content') addview!: ElementRef;

  //metodos del add para tomar datos
  get NombreUsuario() {
    return this.logform.get('nombreUsuario');
  }

  get Password() {
    return this.logform.get('password');
  }


  onLogin():void{
    this.loginUsuario = new LoginUsuario (this.logform.get('nombreUsuario').value, this.logform.get('password').value);
     this.authService.login(this.loginUsuario).subscribe(data => {
      this.loggedIn = true;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
     this.roles = data.authorities;
     window.location.reload();
    }, err=>{
      this.loggedIn=false;
      alert("Usuario o contraseña inconrrectos");
      this.logform.reset();
    })
  }

  onClose():void{
    this.logform.reset();
  }
}
