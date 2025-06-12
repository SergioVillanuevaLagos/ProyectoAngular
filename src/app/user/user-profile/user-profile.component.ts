import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  sidebarOpen = true;
  constructor(private userService: UserService) {}
  
   ngOnInit(): void {
    const userId = 1; // Cambiar esto luego por el ID desde login/token

    
    //Perfil de usuario simulado
    //Perfil de usuario simulado
      this.user = {
    nombre: 'Juan',
    apellidoPaterno: 'Pérez',
    apellidoMaterno: 'García',
    correo: 'juan.perez@example.com',
    rol: 'Arrendador',
    locaciones: [
      { descripcion: 'Departamento céntrico', ubicacion: 'Chillan', precio: 120000 }
    ],
  favoritos: [
    { descripcion: 'Casa en la playa', ubicacion: 'Viña del Mar', precio: 250000 },
    { descripcion: 'Loft moderno', ubicacion: 'Santiago', precio: 180000 }
  ]

  };
  //Perfil de usuario simulado
  //Perfil de usuario simulado


    this.userService.getUserProfile(userId).subscribe({
      next: data => this.user = data,
      error: err => console.error('Error al cargar perfil', err)
    });
  }
}
