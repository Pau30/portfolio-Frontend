export class Experiencia {
  id: number;
  nombre: string;
  puesto: string;
  descripcion: string;
  logo: string;
  inicio: string;
  fin: string;


  constructor(nombre: string, puesto: string, descripcion: string, logo: string, inicio: string, fin: string) {
    this.nombre = nombre;
    this.puesto = puesto;
    this.descripcion = descripcion;
    this.logo = logo;
    this.inicio = inicio;
    this.fin = fin;

  }
}
