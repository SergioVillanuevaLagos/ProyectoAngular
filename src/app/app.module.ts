import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { ListarLocacionesComponent } from './shared/components/listar-locaciones/listar-locaciones.component';
import { LocationFilterSidebarComponent } from './shared/components/location-filter-sidebar/location-filter-sidebar.component';
import { DetalleLocacionComponent } from './shared/components/detalle-locacion/detalle-locacion.component';
import { DetalleProductoComponent } from './views/detalle-producto/detalle-producto.component';
import { NavbarComponent } from './navbar/navbar.component'; 
import { MapasComponent } from './shared/components/mapas/mapas.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { AgendaVisitaComponent } from './agenda-visita/agenda-visita.component'; 
import { NavbarComponentComponent } from './shared/components/navbar-component/navbar-component.component';
import { PublicacionPropiedadComponent } from './publicacion-propiedad/publicacion-propiedad.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReportModalComponent } from "./shared/components/report-modal/report-modal.component";
import { AdminReportesComponent } from './shared/components/admin-reportes/admin-reportes.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    ListarLocacionesComponent,
    LocationFilterSidebarComponent,
    
    DetalleProductoComponent,
    MapasComponent,
    AgendaVisitaComponent,
    NavbarComponentComponent,
    PublicacionPropiedadComponent,
    AdminReportesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
