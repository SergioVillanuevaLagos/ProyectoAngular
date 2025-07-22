import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../user/user.service'; // Importa el servicio

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService // Inyecta el servicio
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      run: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      // Elimina telefono si no lo usas en el backend
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    // Prepara los datos para el backend
    const userData = {
      Run: this.registerForm.value.run,
      Nombre: this.registerForm.value.nombre,
      ApellidoPaterno: this.registerForm.value.apellidoPaterno,
      ApellidoMaterno: this.registerForm.value.apellidoMaterno,
      Correo: this.registerForm.value.email,
      Contrasena: this.registerForm.value.password,
      IdRol:  1 // Ajusta el rol si es necesario
    };

    // Llama al servicio para registrar el usuario
    this.userService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('Usuario registrado:', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        // Muestra mensaje de error si quieres
      }
    });
  }
}
