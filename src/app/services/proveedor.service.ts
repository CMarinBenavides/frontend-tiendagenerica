import { Injectable, Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Proveedor } from '../models/proveedor/proveedor';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private url = this.baseUrl + '/proveedor';
  private url2 = this.baseUrl + '/proveedores';
  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private httpClient: HttpClient
  ) {}

  saveProveedor(proveedor: Proveedor) {
    return this.httpClient.post<any>(`${this.url}`, proveedor);
  }

  getProveedores() {
    return this.httpClient.get<any>(`${this.url2}`);
  }

  getProveedorById(id: bigint) {
    return this.httpClient.get<any>(`${this.url}/${id}`);
  }

  deleteProveedor(id: bigint) {
    return this.httpClient.delete<any>(`${this.url}/${id}`);
  }

  updateProveedor(proveedor: Proveedor) {
    return this.httpClient.put<any>(`${this.url}`, proveedor);
  }
}
