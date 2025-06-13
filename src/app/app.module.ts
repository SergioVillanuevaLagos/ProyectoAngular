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
import { GoogleMapsModule } from '@angular/google-maps';
import { MainComponent } from './main/main.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReportModalComponent } from "./shared/components/report-modal/report-modal.component";
import { AdminReportesComponent } from './shared/components/admin-reportes/admin-reportes.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { AgendaVisitaComponent } from './shared/components/agenda-visita/agenda-visita.component';
import { PublicacionPropiedadComponent } from './shared/components/publicacion-propiedad/publicacion-propiedad.component';
import { OAuthErrorEvent, OAuthModule } from 'angular-oauth2-oidc';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    AgendaVisitaComponent,
    NavbarComponent,
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
    OAuthModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
