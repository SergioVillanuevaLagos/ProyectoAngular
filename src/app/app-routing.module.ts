import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarLocacionesComponent } from './shared/components/listar-locaciones/listar-locaciones.component';
import { DetalleLocacionComponent } from './shared/components/detalle-locacion/detalle-locacion.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detalle-locacion/:id', component: DetalleLocacionComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
