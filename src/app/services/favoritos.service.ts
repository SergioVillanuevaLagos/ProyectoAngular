import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(private http: HttpClient) { }

  // Obtener favoritos de un usuario
  getFavoritosByUsuario(idUsuario: number): Observable<any> {
    return this.http.get(`${API}/favoritos/${idUsuario}`);
  }

  // Verificar si una locación está en favoritos
  existeFavorito(idUsuario: number, idLocacion: number): Observable<any> {
    return this.http.get(`${API}/favoritos/existe/${idUsuario}/${idLocacion}`);
  }

  // Agregar favorito
  agregarFavorito(idUsuario: number, idLocacion: number): Observable<any> {
    return this.http.post(`${API}/favoritos`, { IdUsuario: idUsuario, IdLocacion: idLocacion });
  }

  // Eliminar favorito
  eliminarFavorito(idUsuario: number, idLocacion: number): Observable<any> {
    return this.http.request('delete', `${API}/favoritos`, {
      body: { IdUsuario: idUsuario, IdLocacion: idLocacion }
    });
  }
}
