import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicacionPropiedadComponent } from './publicacion-propiedad/publicacion-propiedad.component'; // <-- Agrega esto

const routes: Routes = [
  { path: 'publicar', component: PublicacionPropiedadComponent }, // <-- Y esto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
