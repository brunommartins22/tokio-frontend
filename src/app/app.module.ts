import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Cliente } from './pages/cadastro/cliente/cliente.component';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    Cliente
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
