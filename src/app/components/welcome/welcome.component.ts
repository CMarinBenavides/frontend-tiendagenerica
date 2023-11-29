import { Component, inject } from '@angular/core';

import { Router } from '@angular/router';
import { get } from 'jquery';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Cliente } from 'src/app/models/cliente/cliente';
import { Proveedor } from 'src/app/models/proveedor/proveedor';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  usuario: Usuario = new Usuario();
  cliente: Cliente = new Cliente();
  proveedor: Proveedor = new Proveedor();
  usuarioService = inject(UsuarioService);
  clienteService = inject(ClienteService);
  proveedorService = inject(ProveedorService);
  seeUserDetails: boolean = false;
  id: bigint;
  rol: string;

  ngOnInit(): void {}
  constructor(private router: Router, private route: ActivatedRoute) {}

  onClickSeeUserDetails(seeUserDetails: boolean) {
    this.seeUserDetails = seeUserDetails;
  }

  getId(id: bigint) {
    this.id = id;
  }

  getRol(rol: string) {
    this.rol = rol;
  }

  getUsuario() {
    this.usuarioService.getUsuario().subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
