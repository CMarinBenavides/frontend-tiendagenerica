import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private url = this.baseUrl + '/rol';

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private httpClient: HttpClient
  ) {}

  getAllRoles() {
    return this.httpClient.get<any[]>(`${this.url}`);
  }
}
