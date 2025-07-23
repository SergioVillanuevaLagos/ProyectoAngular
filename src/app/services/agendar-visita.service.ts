import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendarVisitaService {

  constructor(private http: HttpClient) { }

  agendarVisita(data: any): Observable<any> {
    
    const body = {
      FechaVisita: data.fecha,
      HoraVisita: data.hora,
      Nombre: data.nombre,
      ApellidoMaterno: data.apellidoMaterno,
      ApellidoPaterno: data.apellidoPaterno,
      Correo: data.correo
    };
    return this.http.post('http://localhost:3000/visitas', body);
  }
}
