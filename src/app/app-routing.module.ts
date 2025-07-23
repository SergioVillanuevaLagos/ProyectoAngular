import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ListarLocacionesComponent } from './shared/components/listar-locaciones/listar-locaciones.component';
import { DetalleLocacionComponent } from './shared/components/detalle-locacion/detalle-locacion.component';
import { HomeComponent } from './views/home/home.component';
import { AdminReportesComponent } from './shared/components/admin-reportes/admin-reportes.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AgendaVisitaComponent } from './shared/components/agenda-visita/agenda-visita.component';
import { PublicacionPropiedadComponent } from './shared/components/publicacion-propiedad/publicacion-propiedad.component';
import { DetalleProductoComponent } from './views/detalle-producto/detalle-producto.component';
import { AdminLocacionesComponent } from './shared/components/admin-locaciones/admin-locaciones.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { GoogleRegistrationComponent } from './user/google-registration/google-registration.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'listar', component: ListarLocacionesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'Publicaciones', component: DetalleProductoComponent },
  { path: 'detalle-locacion/:id', component: DetalleLocacionComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'agendar-visita', component: AgendaVisitaComponent },
  { path: 'pagina-principal', component: HomeComponent },
  { path: 'publicar-propiedad', component: PublicacionPropiedadComponent },
  { path: 'reportes', component: AdminReportesComponent },
  { path: 'AdminLocaciones', component: AdminLocacionesComponent },
  { path: 'Perfil', component: UserProfileComponent },
  { path: 'complete-registration', component: GoogleRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
