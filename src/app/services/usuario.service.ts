// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'http://localhost:3000'; // Ajusta a dominio posterior


@Injectable({ providedIn: 'root' })
export class UsuarioService {
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get(`${API}/usuarios`);
  }

  getUsuarioById(id: number): Observable<any> {
    return this.http.get(`${API}/usuarios/${id}`);
  }

  crearUsuario(data: any): Observable<any> {
    return this.http.post(`${API}/usuarios`, data);
  }

  actualizarUsuario(id: number, data: any): Observable<any> {
    return this.http.put(`${API}/usuarios/${id}`, data);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${API}/usuarios/${id}`);
  }

  loginUsuario(credentials: { Correo: string; Contrasena: string }): Observable<any> {
    return this.http.post(`${API}/login`, credentials);
  }

  // crear usuario
  registerUser(data: any): Observable<any> {
    return this.crearUsuario(data);
  }


}
