export class Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  link: string;
  anio: number;


  constructor(nombre: string, descripcion: string, imagen: string,link: string, anio: number) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.link=link;
    this.anio=anio;
  }
}
