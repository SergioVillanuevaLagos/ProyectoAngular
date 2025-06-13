import { Component, Input, OnInit } from '@angular/core';
import { Locacion } from '../../../models/locacion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-locaciones',
  templateUrl: './listar-locaciones.component.html',
  styleUrls: ['./listar-locaciones.component.css']
})
export class ListarLocacionesComponent implements OnInit {
  @Input() filteredLocaciones: Locacion[] | null = null;

  locaciones: Locacion[] = [];

  houseImages: string[] = [
    '',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO5NOj5RT-0PUp2VeRVOuUYaO06fcMMyxxCA&s',
    'https://img10.naventcdn.com/avisos/resize/9/01/46/64/67/30/1200x1200/1536967289.jpg?isFirstImage=true',
    'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=400&q=80',
    'https://www.toppropiedades.cl/imagenes/blog_7e42facbb1.jpg'
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.filteredLocaciones) {

      this.locaciones = [];
    }
  }

  get displayLocaciones(): Locacion[] {
    return this.filteredLocaciones ?? this.locaciones;
  }

  getImageUrl(index: number): string {
    
    return this.houseImages[index % this.houseImages.length];
  }

  goToDetalle(id: number) {
    this.router.navigate(['/detalle-locacion', id]);
  }
}
