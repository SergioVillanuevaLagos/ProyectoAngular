// src/app/auth/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
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
    this.errorMessage = '';

    console.log('Form submitted');
    console.log('Form valid:', this.registerForm.valid);
    console.log('Form values:', this.registerForm.value);
    console.log('Form errors:', this.getFormErrors());

    if (this.registerForm.invalid) {
      console.log('Form is invalid, stopping submission');
      return;
    }

    this.loading = true;

    const userData = {
      Run: this.registerForm.value.run,
      Nombre: this.registerForm.value.nombre,
      ApellidoPaterno: this.registerForm.value.apellidoPaterno,
      ApellidoMaterno: this.registerForm.value.apellidoMaterno,
      Correo: this.registerForm.value.email,
      Contrasena: this.registerForm.value.password,
      IdRol: 1 
    };

    console.log('Sending userData:', userData);

    this.userService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('Usuario registrado exitosamente:', response);
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error completo al registrar usuario:', err);
        this.loading = false;
        
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else if (err.message) {
          this.errorMessage = err.message;
        } else {
          this.errorMessage = 'Error al registrar usuario. Inténtalo de nuevo.';
        }
      }
    });
  }

  private getFormErrors(): any {
    let formErrors: any = {};
    Object.keys(this.registerForm.controls).forEach(key => {
      const controlErrors = this.registerForm.get(key)?.errors;
      if (controlErrors) {
        formErrors[key] = controlErrors;
      }
    });
    return formErrors;
  }

  // Método helper para verificar errores de campo específico
  hasFieldError(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return `${fieldName} es requerido`;
      if (field.errors['email']) return 'Email inválido';
      if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
