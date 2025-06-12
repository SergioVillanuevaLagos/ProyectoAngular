import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-publicacion-propiedad',
  templateUrl: './publicacion-propiedad.component.html',
  styleUrls: ['./publicacion-propiedad.component.css']
})
export class PublicacionPropiedadComponent implements OnInit {
  formularioPropiedad: FormGroup;
  imagenes: File[] = [];
  imagenesPreview: string[] = [];
  errorImagenes: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formularioPropiedad = this.fb.group({
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

  alCambiarArchivo(evento: any): void {
    const archivos = evento.target.files;
    if (archivos && archivos.length > 0) {
      for (let i = 0; i < archivos.length; i++) {
        const archivo = archivos[i];
        this.imagenes.push(archivo);

        const lector = new FileReader();
        lector.onload = (e: any) => {
          this.imagenesPreview.push(e.target.result);
        };
        lector.readAsDataURL(archivo);
      }
      this.errorImagenes = false;
    } else if (this.imagenes.length === 0) {
      this.errorImagenes = true;
    }
  }

  eliminarImagen(indice: number): void {
    this.imagenes.splice(indice, 1);
    this.imagenesPreview.splice(indice, 1);
    if (this.imagenes.length === 0) {
      this.errorImagenes = true;
    }
  }

  alEnviar(): void {
    if (this.imagenes.length === 0) {
      this.errorImagenes = true;
      return;
    }
    if (this.formularioPropiedad.invalid) {
      this.formularioPropiedad.markAllAsTouched();
      return;
    }
    // Aquí puedes manejar el envío del formulario y las imágenes
    console.log(this.formularioPropiedad.value, this.imagenes);
  }
}
