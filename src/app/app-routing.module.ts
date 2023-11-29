import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { UploadProductoComponent } from './components/proveedor/upload-producto/upload-producto.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'welcome/user-details/:id/:rol',
    component: WelcomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'welcome/update-user/:id/:rol',
    component: WelcomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'proveedor/upload-producto',
    component: UploadProductoComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
