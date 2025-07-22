import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../user/user.service';
import { AutenticacionGoogleService } from '../../../autenticacion-google.service';

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
    private autenticacionGoogleService: AutenticacionGoogleService
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
          // ✅ Guardar usuario en localStorage (opcional, puedes usar sessionStorage también)
          localStorage.setItem('user', JSON.stringify(res.data));

          // ✅ Redirigir a la página principal (puedes cambiar la ruta)
          this.router.navigate(['/']);
        } else {
          // ❌ Mostrar mensaje de error recibido del backend
          this.loginError = res.message || 'Credenciales incorrectas';
        }
      },
      error: (err) => {
        // ❌ Error inesperado (ej: backend caído)
        this.loginError = err.error?.message || 'Error del servidor';
      }
    });
  }
}
