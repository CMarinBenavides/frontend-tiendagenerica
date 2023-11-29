import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioAuth } from '../models/usuario.auth/usuario.auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth/login';

  constructor(private httpClient: HttpClient) {}

  // Metodo para autenticar un usuario
  authenticate(auth: UsuarioAuth) {
    return this.httpClient.post<any>(this.baseUrl, auth);
  }
}
