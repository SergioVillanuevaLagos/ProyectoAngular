import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../user/user.service';
import { AutenticacionGoogleService } from '../../../autenticacion-google.service';
import { AuthService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  loginError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private autenticacionGoogleService: AutenticacionGoogleService,
    private authService: AuthService // <--- agrega esto
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // Login con Google (si tienes implementada la API de Google)
  login() {
    this.autenticacionGoogleService.login();
  }

  // Navegar al registro
  goToRegister() {
    this.router.navigate(['/register']);
  }

  // Login con usuario/contraseña
  onSubmit() {
    this.submitted = true;
    this.loginError = null;

    if (this.loginForm.invalid) return;

    const credentials = {
      Correo: this.loginForm.value.email,
      Contrasena: this.loginForm.value.password
    };

    this.userService.loginUser(credentials).subscribe({
      next: (res) => {
        if (!res.error) {
          this.authService.login(res.data); // <--- usa el servicio
          this.router.navigate(['/']);
        } else {
          this.loginError = res.message || 'Credenciales incorrectas';
        }
      },
      error: (err) => {
        this.loginError = err.error?.message || 'Error del servidor';
      }
    });
  }
}
