import { Component } from '@angular/core';
import { Persona } from 'src/app/model/persona';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent {
  persona: Persona = new Persona("", "", "");

}
