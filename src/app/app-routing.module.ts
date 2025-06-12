import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ListarLocacionesComponent } from './shared/components/listar-locaciones/listar-locaciones.component';
import { DetalleLocacionComponent } from './shared/components/detalle-locacion/detalle-locacion.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { PublicacionPropiedadComponent } from './shared/components/publicacion-propiedad/publicacion-propiedad.component';
import { DetalleProductoComponent } from './views/detalle-producto/detalle-producto.component';
import { AgendaVisitaComponent } from './shared/components/agenda-visita/agenda-visita.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'detalle-locacion/:id', component: DetalleLocacionComponent },
  { path: 'agendar-visita', component: AgendaVisitaComponent },
  { path: 'pagina-principal', component: HomeComponent },
  { path: 'Publicaciones', component: DetalleProductoComponent },
  { path: 'publicar-propiedad', component: PublicacionPropiedadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
