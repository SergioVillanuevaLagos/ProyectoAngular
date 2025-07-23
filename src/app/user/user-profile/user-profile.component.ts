import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { LocacionService } from '../../services/locacion.service'; // Asegúrate de importar correctamente
import { Locacion } from '../../models/locacion.model'; // Asegúrate de tener este modelo o usa tipo any

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  sidebarOpen = true;

  constructor(
    private userService: UserService,
    private locacionService: LocacionService
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);

      if (this.user?.IdRol === 1) {
        this.locacionService.getLocacionesByAdmin(this.user.IDUsuario).subscribe({
          next: (locaciones) => {
            this.user.locaciones = locaciones; // ← se las inyectas al objeto `user`
          },
          error: (err) => {
            console.error('Error al obtener locaciones del admin:', err);
            this.user.locaciones = [];
          }
        });
      }
    }
  }
}
