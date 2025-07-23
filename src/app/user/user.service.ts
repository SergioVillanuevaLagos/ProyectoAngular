import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:3000';
  
  constructor(private http: HttpClient) {}

  getUserProfile(id: number): Observable<any> {
    return this.http.get(`/api/users/${id}`);
  }

  // Método para registrar usuario
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios`, userData);
  }

  // Método para login de usuario
  loginUser(credentials: { Correo: string; Contrasena: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
  
  // Método para buscar usuario por correo 
  findUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios/email/${email}`);
  }
  
  // Método para completar registro de usuario de Google
  completeGoogleRegistration(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios/google-register`, userData);
  }
}