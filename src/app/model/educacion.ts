export class Educacion {
  id: number;
  nombre: string;
  descripcion: string;
  logo: string;
  inicio: number;
  fin: number;

  constructor(nombre: string, descripcion: string, logo: string, inicio:number, fin:number) {
   this.nombre = nombre;
   this.descripcion = descripcion;
   this.logo = logo;
   this.inicio = inicio;
   this.fin = fin;
}
}
