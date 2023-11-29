import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioAuth } from '../../models/usuario.auth/usuario.auth';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  auth: UsuarioAuth = new UsuarioAuth();

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  authenticate() {
    this.authService.authenticate(this.auth).subscribe({
      next: (data) => {
        console.log(data);
        localStorage.setItem('token', data.accessToken);
        this.goToWelcome();

        Swal.fire({
          title: 'Bienvenido',
          text: 'Inicio de sesión exitoso',
          icon: 'success',
          timer: 2000,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
          timer: 2000,
        });
      },
    });
  }
  onSubmit() {
    this.authenticate();
  }

  goToWelcome() {
    this.router.navigate(['/welcome']);
  }
}
