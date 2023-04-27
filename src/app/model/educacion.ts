export class Educacion {
  id: number;
  nombre: string;
  nombreCorto: string;
  titulo: string;
  descripcion: string;
  logo: string;
  inicio: number;
  fin: number;

  constructor(nombre: string, nombreCorto: string, titulo: string, descripcion: string, logo: string, inicio: number, fin: number) {
    this.nombre = nombre;
    this.nombreCorto = nombreCorto;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.logo = logo;
    this.inicio = inicio;
    this.fin = fin;
  }
}
