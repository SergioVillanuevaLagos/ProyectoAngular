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
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      // Si quieres obtener datos actualizados desde el backend:
      // this.userService.getUserProfile(this.user.IDUsuario).subscribe({
      //   next: data => this.user = data,
      //   error: err => console.error('Error al cargar perfil', err)
      // });
    }
  }
}
