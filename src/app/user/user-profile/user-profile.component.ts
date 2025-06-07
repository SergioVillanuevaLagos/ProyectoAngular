import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = 1; // Cambiar esto luego por el ID desde login/token
      this.user = {
    nombre: 'Juan',
    apellidoPaterno: 'Pérez',
    apellidoMaterno: 'García',
    correo: 'juan.perez@example.com',
    rol: 'Administrador',
    locaciones: [
      { descripcion: 'Departamento céntrico', ubicacion: 'CDMX', precio: 12000 }
    ]
  };
    this.userService.getUserProfile(userId).subscribe({
      next: data => this.user = data,
      error: err => console.error('Error al cargar perfil', err)
    });
  }
}
