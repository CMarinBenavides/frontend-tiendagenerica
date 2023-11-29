import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/rol/rol';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent {
  usuarioService = inject(UsuarioService);
  usuarios: Usuario[];
  dtOptions: DataTables.Settings = {};
  @Output() seeUserDetails: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() id: EventEmitter<bigint> = new EventEmitter<bigint>();
  @Output() rol: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
    this.getUsuarios();
  }

  constructor(private router: Router) {}

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json',
      },
      responsive: true,
      dom: 'Bfrtip',
    };
  }

  getUserDetails(id: bigint, roles: Rol[]) {
    this.id.emit(id);
    this.rol.emit(roles[0].rol_nombre);
    this.seeUserDetails.emit(true);
  }

  deleteUser(id: bigint) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'El usuario será eliminado permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#ff0000',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#00ff33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(id).subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Usuario eliminado',
              text: 'El usuario fue eliminado exitosamente',
              icon: 'success',
              timer: 2000,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
            });
            this.getUsuarios();
          },
          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: 'El usuario no pudo ser eliminado',
              icon: 'error',
              timer: 2000,
            });
          },
        });
      }
    });
  }

  updateUser(id: bigint, rol: Rol[]) {
    this.router.navigate(['/welcome/update-user', id, rol[0].rol_nombre]);
  }
}
