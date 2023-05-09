import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';

@Component({
  selector: 'app-boton-scroll',
  templateUrl: './boton-scroll.component.html',
  styleUrls: ['./boton-scroll.component.css']
})
export class BotonScrollComponent {

  windowScrolled: boolean;

  constructor(@Inject(DOCUMENT) private document: Document) {}
  //Metodo para que el boton aparezca al hacer scroll
  @HostListener("window:scroll", [])
  onWindowScroll() {
      if (document.documentElement.scrollTop || document.body.scrollTop) {
          this.windowScrolled = true;
      }
     else {
          this.windowScrolled = false;
      }
  }
//Metodo para hacer scroll hacia arriba de la pagina
  scrollToTop(): void {
       return this.document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    });
  }
}
