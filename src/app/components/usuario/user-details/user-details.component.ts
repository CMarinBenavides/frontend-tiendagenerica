import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario';
import { Cliente } from 'src/app/models/cliente/cliente';
import { Proveedor } from 'src/app/models/proveedor/proveedor';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  @Input() id: bigint;
  @Input() rol: string;
  @Output() seeUserDetails: EventEmitter<boolean> = new EventEmitter<boolean>();
  usuario: Usuario;
  cliente: Cliente;
  proveedor: Proveedor;
  usuarioService = inject(UsuarioService);
  proveedorService = inject(ProveedorService);
  clienteService = inject(ClienteService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    if (this.rol == 'CLIENTE') {
      this.cliente = new Cliente();
      this.clienteService.getClienteById(this.id).subscribe({
        next: (data) => {
          this.cliente = data;
        },
        error: (err) => {
          console.log('Error al obtener el cliente');
          console.log(err);
        },
      });
    } else if (this.rol == 'PROVEEDOR') {
      this.proveedor = new Proveedor();
      this.proveedorService.getProveedorById(this.id).subscribe({
        next: (data) => {
          this.proveedor = data;
        },
        error: (err) => {
          console.log('Error al obtener el proveedor');
          console.log(err);
        },
      });
    } else {
      this.usuario = new Usuario();
      this.usuarioService.getUsuarioById(this.id).subscribe({
        next: (data) => {
          this.usuario = data;
        },
        error: (err) => {
          console.log('Error al obtener el usuario');
          console.log(err);
        },
      });
    }
  }

  onClickBack() {
    this.seeUserDetails.emit(false);
  }
}
