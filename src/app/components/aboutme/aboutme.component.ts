import { Component } from '@angular/core';
import { Persona } from 'src/app/model/persona';
import { AboutmeService } from 'src/app/services/aboutme.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent {
  persona: Persona = new Persona("", "", "");

  constructor(public aboutmeService: AboutmeService) { }

  ngOnInit(): void {
    this.cargarPersona(1);}

cargarPersona(id: number): void {
  this.aboutmeService.verPersona(id).subscribe(data => { this.persona = data });
}
}
