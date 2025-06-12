import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { ListarLocacionesComponent } from './shared/components/listar-locaciones/listar-locaciones.component';
import { LocationFilterSidebarComponent } from './shared/components/location-filter-sidebar/location-filter-sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleLocacionComponent } from './shared/components/detalle-locacion/detalle-locacion.component';
import { DetalleProductoComponent } from './views/detalle-producto/detalle-producto.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { MapasComponent } from './shared/components/mapas/mapas.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReportModalComponent } from "./shared/components/report-modal/report-modal.component";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListarLocacionesComponent,
    LocationFilterSidebarComponent,
    DetalleLocacionComponent,
    DetalleProductoComponent,
    NavbarComponent,
    MapasComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GoogleMapsModule,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    ReportModalComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
