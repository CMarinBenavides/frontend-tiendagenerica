import { Component, OnInit, inject } from '@angular/core';

import { Rol } from '../../../models/rol/rol';
import { Usuario } from 'src/app/models/usuario/usuario';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { Proveedor } from 'src/app/models/proveedor/proveedor';
import { Cliente } from 'src/app/models/cliente/cliente';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  rolService = inject(RolService);
  usuarioService = inject(UsuarioService);
  proveedorService = inject(ProveedorService);
  clienteService = inject(ClienteService);
  roles: Rol[];
  usuario: Usuario = new Usuario();
  proveedor: Proveedor = new Proveedor();
  cliente: Cliente = new Cliente();
  rolSelect: Rol = new Rol();
  rolesUsuario: Rol[] = [];

  constructor() {}
  ngOnInit(): void {
    this.getRoles();
  }
  onSubmit() {
    if (this.rolSelect.rol_nombre == 'PROVEEDOR') {
      this.saveProveedor(this.proveedor).subscribe({
        next: (data) => {
          Swal.fire({
            title: 'Proveedor registrado',
            text: 'Proveedor registrado con éxito',
            icon: 'success',
            timer: 2000,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
          });
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            title: 'Error',
            text: 'Error al registrar el proveedor',
            icon: 'error',
            timer: 2000,
          });
        },
      });
    } else if (this.rolSelect.rol_nombre == 'CLIENTE') {
      this.clienteService.saveCliente(this.cliente).subscribe({
        next: (data) => {
          Swal.fire({
            title: 'Cliente registrado',
            text: 'Cliente registrado con éxito',
            icon: 'success',
            timer: 2000,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
          });
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            title: 'Error',
            text: 'Error al registrar el cliente',
            icon: 'error',
            timer: 2000,
          });
        },
      });
    } else {
      this.saveUsuario(this.usuario).subscribe({
        next: (data) => {
          Swal.fire({
            title: 'Usuario registrado',
            text: 'Usuario registrado con éxito',
            icon: 'success',
            timer: 2000,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
          });
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            title: 'Error',
            text: 'Error al registrar el usuario',
            icon: 'error',
            timer: 2000,
          });
        },
      });
    }
  }
  saveUsuario(usuario: Usuario) {
    return this.usuarioService.saveUsuario(usuario);
  }

  saveProveedor(proveedor: Proveedor) {
    return this.proveedorService.saveProveedor(proveedor);
  }

  getRoles() {
    return this.rolService.getAllRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  rolSelected() {
    this.rolesUsuario = [];
    this.rolesUsuario.push(this.rolSelect);
    console.log(this.rolesUsuario);
    this.usuario.roles = this.rolesUsuario;
  }
}
