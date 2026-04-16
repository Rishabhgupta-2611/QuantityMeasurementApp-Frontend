import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuantityInputDTO } from '../models/quantity.model';

@Injectable({
  providedIn: 'root'
})
export class QuantityService {

  private readonly BASE_URL = 'http://localhost:8082/api/v1/quantities';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  compare(data: QuantityInputDTO) {
    return this.http.post(`${this.BASE_URL}/compare`, data, {
      headers: this.getAuthHeaders()
    });
  }

  convert(data: QuantityInputDTO) {
    return this.http.post(`${this.BASE_URL}/convert`, data, {
      headers: this.getAuthHeaders()
    });
  }

  add(data: QuantityInputDTO) {
    return this.http.post(`${this.BASE_URL}/add`, data, {
      headers: this.getAuthHeaders()
    });
  }

  subtract(data: QuantityInputDTO) {
    return this.http.post(`${this.BASE_URL}/subtract`, data, {
      headers: this.getAuthHeaders()
    });
  }

  divide(data: QuantityInputDTO) {
    return this.http.post(`${this.BASE_URL}/divide`, data, {
      headers: this.getAuthHeaders()
    });
  }

  getHistory(operation: string) {
    return this.http.get(`${this.BASE_URL}/history/operation/${operation}`, {
      headers: this.getAuthHeaders()
    });
  }

  getCount(operation: string) {
    return this.http.get(`${this.BASE_URL}/count/${operation}`);
  }
}
