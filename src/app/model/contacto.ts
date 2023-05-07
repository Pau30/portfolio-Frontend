export class Contacto {
  id: number;
  email: string;
  mensaje: string;


  constructor(email: string, mensaje: string) {
    this.email = email;
    this.mensaje = mensaje;

  }
}
