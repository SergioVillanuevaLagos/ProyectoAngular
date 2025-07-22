import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProfile(id: number): Observable<any> {
    return this.http.get(`/api/users/${id}`);
  }

  // Método para registrar usuario
  registerUser(userData: any): Observable<any> {
    return this.http.post('http://localhost:3000/usuarios', userData);
  }
}