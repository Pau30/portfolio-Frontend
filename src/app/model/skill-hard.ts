export class SkillHard {

  id: number;
  nombre!: string;
  porcentaje!: number;
  tipo!: string;


  constructor(nombre: string, porcentaje: number, tipo: string) {
    this.nombre = nombre;
    this.porcentaje = porcentaje;
    this.tipo = tipo;
  }
}
