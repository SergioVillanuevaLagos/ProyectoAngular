import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { ListarLocacionesComponent } from './shared/components/listar-locaciones/listar-locaciones.component';
import { DetalleLocacionComponent } from './shared/components/detalle-locacion/detalle-locacion.component';
import { HomeComponent } from './views/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AgendaVisitaComponent } from './agenda-visita/agenda-visita.component';
import { PublicacionPropiedadComponent } from './publicacion-propiedad/publicacion-propiedad.component'; 

const routes: Routes = [
  { path: '', component: ListarLocacionesComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'detalle-locacion/:id', component: DetalleLocacionComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'agendar-visita', component: AgendaVisitaComponent },
  { path: 'pagina-principal', component: HomeComponent },
  { path: 'publicar-propiedad', component: PublicacionPropiedadComponent }
import { AdminReportesComponent } from './shared/components/admin-reportes/admin-reportes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detalle-locacion/:id', component: DetalleLocacionComponent },
  { path: 'admin-reportes', component: AdminReportesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
