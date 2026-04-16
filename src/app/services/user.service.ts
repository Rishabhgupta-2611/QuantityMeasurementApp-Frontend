import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly BASE_URL = 'http://localhost:8081/api/v1/users';

  constructor(private http: HttpClient) {}

  register(dto: RegisterDTO): Observable<string> {
    return this.http.post(`${this.BASE_URL}/register`, dto, {
      responseType: 'text'
    });
  }

  login(dto: LoginDTO): Observable<string> {
    return this.http.post(`${this.BASE_URL}/login`, dto, {
      responseType: 'text'
    });
  }

  check(): Observable<string> {
    return this.http.get(`${this.BASE_URL}/check`, {
      responseType: 'text'
    });
  }
}
