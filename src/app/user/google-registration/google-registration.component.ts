import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-google-registration',
  templateUrl: './google-registration.component.html',
  styleUrls: ['./google-registration.component.css']
})
export class GoogleRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  googleData: any;
  submitted = false;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Recuperar datos de Google del localStorage
    const googleUserDataStr = localStorage.getItem('googleUserData');
    if (!googleUserDataStr) {
      this.router.navigate(['/login']);
      return;
    }

    this.googleData = JSON.parse(googleUserDataStr);

    // Inicializar formulario con datos de Google
    this.registrationForm = this.formBuilder.group({
      run: ['', [Validators.required]],
      nombre: [this.googleData.Nombre, [Validators.required]],
      apellidoPaterno: [this.googleData.ApellidoPaterno, [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      email: [{ value: this.googleData.Correo, disabled: true }, [Validators.required, Validators.email]],
      idRol: [1] // Rol por defecto
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = null;

    if (this.registrationForm.invalid) {
      return;
    }

    // Crear objeto con todos los datos
    const userData = {
      Run: this.registrationForm.value.run,
      Nombre: this.registrationForm.value.nombre,
      ApellidoPaterno: this.registrationForm.value.apellidoPaterno,
      ApellidoMaterno: this.registrationForm.value.apellidoMaterno,
      Correo: this.googleData.Correo, // Usar el email de Google
      IdRol: this.registrationForm.value.idRol,
      // Para usuarios de Google, podemos generar una contraseña aleatoria
      Contrasena: Math.random().toString(36).substring(2, 15)
    };

    this.userService.registerUser(userData).subscribe({
      next: (response) => {
        // Limpiar datos temporales
        localStorage.removeItem('googleUserData');
        
        // Hacer login con el nuevo usuario
        this.userService.findUserByEmail(userData.Correo).subscribe({
          next: (user) => {
            if (!user.error && user.data) {
              this.authService.login(user.data);
              this.router.navigate(['/']);
            } else {
              this.error = 'Error al iniciar sesión automáticamente';
            }
          },
          error: (err) => {
            console.error('Error al iniciar sesión:', err);
            this.error = 'Error al iniciar sesión automáticamente';
            this.router.navigate(['/login']);
          }
        });
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        this.error = err.error?.message || 'Error al registrar el usuario';
      }
    });
  }
}
