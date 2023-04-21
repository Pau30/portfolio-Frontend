import { Component } from '@angular/core';
import { Persona } from 'src/app/model/persona';
import { AboutmeService } from 'src/app/services/aboutme.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent {
  persona: Persona = new Persona("", "", "");
  loggedIn = false;
  constructor(private aboutmeService: AboutmeService, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.cargarPersona(1);
    if (this.tokenService.getToken()) {
      console.log("Logeado");
      this.loggedIn = true;
    } else {
      this.loggedIn=false;
    }
  }

cargarPersona(id: number): void {
  this.aboutmeService.verPersona(id).subscribe(data => { this.persona = data });
}
}
