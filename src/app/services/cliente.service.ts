import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private url = this.baseUrl + '/cliente';
  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private httpClient: HttpClient
  ) {}

  saveCliente(cliente: Cliente) {
    return this.httpClient.post<any>(`${this.url}`, cliente);
  }

  getClientes() {
    return this.httpClient.get<any>(`${this.url}s`);
  }

  getClienteById(id: bigint) {
    return this.httpClient.get<any>(`${this.url}/${id}`);
  }

  deleteCliente(id: bigint) {
    return this.httpClient.delete<any>(`${this.url}/${id}`);
  }

  updateCliente(cliente: Cliente) {
    return this.httpClient.put<any>(`${this.url}`, cliente);
  }
}
