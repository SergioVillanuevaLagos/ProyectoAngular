// src/app/auth/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

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
    private userService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      run: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const userData = {
      Run: this.registerForm.value.run,
      Nombre: this.registerForm.value.nombre,
      ApellidoPaterno: this.registerForm.value.apellidoPaterno,
      ApellidoMaterno: this.registerForm.value.apellidoMaterno,
      Correo: this.registerForm.value.email,
      Contrasena: this.registerForm.value.password,
      IdRol: 1 
    };

    this.userService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('Usuario registrado:', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
      }
    });
  }
}
