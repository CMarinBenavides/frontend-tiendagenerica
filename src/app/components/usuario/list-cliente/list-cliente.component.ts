import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css'],
})
export class ListClienteComponent {
  clienteService = inject(ClienteService);
  clientes: Cliente[];
  dtOptions: DataTables.Settings = {};
  @Output() seeUserDetails: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() id: EventEmitter<bigint> = new EventEmitter<bigint>();
  @Output() rol: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
    this.getClientes();
  }

  constructor(private router: Router) {}

  getClientes() {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
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

  getUserDetails(id: bigint) {
    this.seeUserDetails.emit(true);
    this.id.emit(id);
    this.rol.emit('CLIENTE');
  }

  deleteCliente(id: bigint) {
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
        this.clienteService.deleteCliente(id).subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Usuario eliminado',
              text: 'El cliente fue eliminado exitosamente',
              icon: 'success',
              timer: 2000,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
            });
            this.getClientes();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  updateCliente(id: bigint) {
    this.router.navigate(['/welcome/update-user', id, 'CLIENTE']);
  }
}
