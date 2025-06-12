import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-publicacion-propiedad',
  templateUrl: './publicacion-propiedad.component.html',
  styleUrl: './publicacion-propiedad.component.css'
})
export class PublicacionPropiedadComponent implements OnInit {
  propiedadForm: FormGroup;
  fotos: File[] = [];
  fotosPreview: string[] = [];
  fotosError: boolean = false;

  constructor(private fb: FormBuilder) {
    this.propiedadForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      direccion: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      contacto: ['', Validators.required],
      reglas: ['', Validators.required],
      servicios: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    const files = event.target.files;
    this.fotos = [];
    this.fotosPreview = [];
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.fotos.push(file);

        // Crear vista previa
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.fotosPreview.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
      this.fotosError = false;
    } else {
      this.fotosError = true;
    }
  }

  onSubmit(): void {
    if (this.fotos.length === 0) {
      this.fotosError = true;
      return;
    }
    if (this.propiedadForm.invalid) {
      this.propiedadForm.markAllAsTouched();
      return;
    }
    // Aquí puedes manejar el envío del formulario y las fotos
    console.log(this.propiedadForm.value, this.fotos);
  }
}
