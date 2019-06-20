export interface Usuario {
  id: number;
  usuario: string;  
  correo: string;
  token?: Token;
  rol:string;
}

export interface Token {
  refreshToken: string;
  token: string;
  type: string;
}