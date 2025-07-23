import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocacionService } from '../../../services/locacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicacion-propiedad',
  templateUrl: './publicacion-propiedad.component.html',
  styleUrls: ['./publicacion-propiedad.component.css']
})
export class PublicacionPropiedadComponent implements OnInit {
  formularioPropiedad!: FormGroup;
  imagenes: File[] = [];
  imagenesPreview: string[] = [];
  errorImagenes = false;

  tiposLocacion = [
    { id: 1, nombre: 'Departamento' },
    { id: 2, nombre: 'Casa' },
    { id: 3, nombre: 'Oficina' },
    { id: 4, nombre: 'Local Comercial' }
  ];

  formData: any = {
    ReglasCasa: '',
    ServiciosIncluidos: ''
  };

  constructor(
    private fb: FormBuilder,
    private locacionService: LocacionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initFormulario();
  }

  private initFormulario(): void {
    this.formularioPropiedad = this.fb.group({
      area: [null, [Validators.required, Validators.min(1)]],
      habitaciones: [null, [Validators.required, Validators.min(0)]],
      banos: [null, [Validators.required, Validators.min(0)]],
      ubicacion: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      precioMensual: [null, [Validators.required, Validators.min(0)]],
      tipoLocacion: [null, Validators.required],
      reglasCasa: ['', [Validators.required, Validators.maxLength(500)]], 
      serviciosIncluidos: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  alCambiarArchivo(evento: any): void {
    const archivos = evento.target.files;

    if (archivos && archivos.length > 0) {
      for (let i = 0; i < archivos.length; i++) {
        const archivo = archivos[i];
        this.imagenes.push(archivo);

        const lector = new FileReader();
        lector.onload = (e: ProgressEvent<FileReader>) => {
          const resultado = (e.target as FileReader).result as string;
          this.imagenesPreview.push(resultado);
        };
        lector.readAsDataURL(archivo);
      }
      this.errorImagenes = false;
    } else if (this.imagenes.length === 0) {
      this.errorImagenes = true;
    }
  }


  eliminarImagen(index: number): void {
    this.imagenes.splice(index, 1);
    this.imagenesPreview.splice(index, 1);
    this.errorImagenes = this.imagenes.length === 0;
  }

  alEnviar(): void {
    if (this.formularioPropiedad.invalid || this.imagenes.length === 0) {
      this.formularioPropiedad.markAllAsTouched();
      this.errorImagenes = this.imagenes.length === 0;
      return;
    }

    const formData = new FormData();

    // Agregar imágenes
    this.imagenes.forEach((img) => {
      formData.append('imagenes', img, img.name);
    });

    // Agregar datos del formulario
    const valores = this.formularioPropiedad.value;
    formData.append('Area', valores.area);
    formData.append('Habitaciones', valores.habitaciones);
    formData.append('Banos', valores.banos);
    formData.append('Ubicacion', valores.ubicacion);
    formData.append('Descripcion', valores.descripcion);
    formData.append('PrecioMensual', valores.precioMensual);
    formData.append('TipoLocacion', valores.tipoLocacion);
    formData.append('IDAdmin', '17');
    formData.append('ReglasCasa', valores.reglasCasa); 
    formData.append('ServiciosIncluidos', valores.serviciosIncluidos); 

    this.locacionService.crearLocacion(formData).subscribe({
      next: (res) => {
        alert(' Locación publicada con éxito');
        this.resetFormulario();
        this.router.navigate(['/AdminLocaciones']);
      },
      error: (err) => {
        console.error('Error al crear locación:', err);
        alert(` Error al publicar: ${err.status} - ${err.message}`);
      }
    });

  }

  private resetFormulario(): void {
    this.formularioPropiedad.reset();
    this.imagenes = [];
    this.imagenesPreview = [];
    this.errorImagenes = false;
  }
}
