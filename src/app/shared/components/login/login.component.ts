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

  login() {
    this.autenticacionGoogleService.login();
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

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
          // Aquí puedes guardar el usuario en localStorage si quieres
          // localStorage.setItem('user', JSON.stringify(res.data));
          this.router.navigate(['/']); // Redirige a la raíz
        } else {
          this.loginError = res.message || 'Error de autenticación';
        }
      },
      error: (err) => {
        this.loginError = err.error?.message || 'Error de servidor';
      }
    });
  }
}
