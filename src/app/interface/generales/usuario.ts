export interface Usuario {
  id: number;
  usuario: string;
  contrasena: string;
  nombre: string;
  token?: string;
  admin:boolean;
}
