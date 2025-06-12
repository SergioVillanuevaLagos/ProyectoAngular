import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { ListarLocacionesComponent } from './shared/components/listar-locaciones/listar-locaciones.component';
import { LocationFilterSidebarComponent } from './shared/components/location-filter-sidebar/location-filter-sidebar.component';
import { FormsModule } from '@angular/forms';
import { DetalleLocacionComponent } from './shared/components/detalle-locacion/detalle-locacion.component';
import { DetalleProductoComponent } from './views/detalle-producto/detalle-producto.component';
import { MapasComponent } from './shared/components/mapas/mapas.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MainComponent } from './main/main.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);
import { LoginComponent } from './shared/components/login/login.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { PublicacionPropiedadComponent } from './shared/components/publicacion-propiedad/publicacion-propiedad.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { AgendaVisitaComponent } from './shared/components/agenda-visita/agenda-visita.component';

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
    DetalleLocacionComponent,
    DetalleProductoComponent,
    MapasComponent,
    AgendaVisitaComponent,
    PublicacionPropiedadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    GoogleMapsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
