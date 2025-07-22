import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocacionService } from '../../../services/locacion.service';

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

  tiposLocacion = [
    { id: 1, nombre: 'Departamento' },
    { id: 2, nombre: 'Casa' },
    { id: 3, nombre: 'Oficina' },
    { id: 4, nombre: 'Local Comercial' }
  ];

  constructor(private fb: FormBuilder, private locacionService: LocacionService) {
    this.formularioPropiedad = this.fb.group({
      area: [null, [Validators.required, Validators.min(1)]],
      habitaciones: [null, [Validators.required, Validators.min(0)]],
      ubicacion: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      precioMensual: [null, [Validators.required, Validators.min(0)]],
      tipoLocacion: [null, Validators.required]
    });
  }

  ngOnInit(): void { }

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

    const formData = new FormData();

    this.imagenes.forEach(img => {
      formData.append('imagenes', img, img.name);
    });

    formData.append('Area', this.formularioPropiedad.value.area.toString());
    formData.append('Habitaciones', this.formularioPropiedad.value.habitaciones.toString());
    formData.append('Ubicacion', this.formularioPropiedad.value.ubicacion);
    formData.append('Descripcion', this.formularioPropiedad.value.descripcion);
    formData.append('PrecioMensual', this.formularioPropiedad.value.precioMensual.toString());
    formData.append('TipoLocacion', this.formularioPropiedad.value.tipoLocacion.toString());
    formData.append('IDAdmin', '1'); // Ajusta según usuario autenticado

    this.locacionService.crearLocacion(formData).subscribe({
      next: (res) => {
        console.log('Locación creada:', res);
        this.formularioPropiedad.reset();
        this.imagenes = [];
        this.imagenesPreview = [];
        this.errorImagenes = false;
      },
      error: (err) => {
        console.error('Error al crear locación:', err);
      }
    });
  }
}
