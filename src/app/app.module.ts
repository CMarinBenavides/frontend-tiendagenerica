import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/usuario/register-user/register-user.component';
import { ListUserComponent } from './components/usuario/list-user/list-user.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DataTablesModule } from 'angular-datatables';
import { ListProveedorComponent } from './components/usuario/list-proveedor/list-proveedor.component';
import { ListClienteComponent } from './components/usuario/list-cliente/list-cliente.component';
import { UserDetailsComponent } from './components/usuario/user-details/user-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UploadProductoComponent } from './components/proveedor/upload-producto/upload-producto.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterUserComponent,
    ListUserComponent,
    ListProveedorComponent,
    ListClienteComponent,
    UserDetailsComponent,
    NavbarComponent,
    UploadProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module,
    DataTablesModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [
    {
      provide: 'BASE_API_URL',
      useValue: 'http://localhost:8080/api',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
