import { Injectable, Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = this.baseUrl + '/usuario';
  private url2 = this.baseUrl + '/usuarios';

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private httpClient: HttpClient
  ) {}

  saveUsuario(usuario: Usuario) {
    return this.httpClient.post<any>(`${this.url}`, usuario);
  }

  getUsuarios() {
    return this.httpClient.get<any>(`${this.url2}`);
  }

  getUsuario() {
    return this.httpClient.get<any>(`${this.url}`);
  }

  getUsuarioById(id: bigint) {
    return this.httpClient.get<any>(`${this.url}/${id}`);
  }

  deleteUsuario(id: bigint) {
    return this.httpClient.delete<any>(`${this.url}/${id}`);
  }
}
