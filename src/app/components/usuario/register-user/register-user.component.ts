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
import { ActivatedRoute } from '@angular/router';

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
  id: bigint;
  rol: string;
  update: boolean = false;
  updateClave: string;

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.getRoles();
    this.getUpdateUser();
  }
  onSubmit() {
    if (!this.update) {
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
    } else {
      if (this.rolSelect.rol_nombre == 'PROVEEDOR') {
        this.proveedorService.updateProveedor(this.proveedor).subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Proveedor actualizado',
              text: 'Proveedor actualizado con éxito',
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
              text: 'Error al actualizar el proveedor',
              icon: 'error',
              timer: 2000,
            });
          },
        });
      } else if (this.rolSelect.rol_nombre == 'CLIENTE') {
        this.clienteService.updateCliente(this.cliente).subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Cliente actualizado',
              text: 'Cliente actualizado con éxito',
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
              text: 'Error al actualizar el cliente',
              icon: 'error',
              timer: 2000,
            });
          },
        });
      } else {
        this.usuarioService.updateUsuario(this.usuario).subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Usuario actualizado',
              text: 'Usuario actualizado con éxito',
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
              text: 'Error al actualizar el usuario',
              icon: 'error',
              timer: 2000,
            });
          },
        });
      }
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

  getUpdateUser() {
    this.id = this.route.snapshot.params['id'];
    this.rol = this.route.snapshot.params['rol'];
    if (this.rol != null) {
      this.update = true;
      this.rolSelect.rol_nombre = this.rol;
      if (this.rol == 'PROVEEDOR') {
        this.proveedorService.getProveedorById(this.id).subscribe({
          next: (data) => {
            this.proveedor = data;
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else if (this.rol == 'CLIENTE') {
        this.clienteService.getClienteById(this.id).subscribe({
          next: (data) => {
            this.cliente = data;
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this.usuarioService.getUsuarioById(this.id).subscribe({
          next: (data) => {
            this.usuario = data;
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    } else {
      console.log('No hay rol');
    }
  }

  rolSelected() {
    this.rolesUsuario = [];
    this.rolesUsuario.push(this.rolSelect);
    console.log(this.rolesUsuario);
    this.usuario.roles = this.rolesUsuario;
  }
}
