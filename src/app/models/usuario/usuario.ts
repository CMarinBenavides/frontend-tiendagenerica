import { Rol } from '../rol/rol';

export class Usuario {
  cedula: bigint;
  nombre_completo: string;
  correo_electronico: string;
  clave: string;
  roles: Rol[];
  usuario: string;
}
