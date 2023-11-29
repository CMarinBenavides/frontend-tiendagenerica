import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-proveedor',
  templateUrl: './list-proveedor.component.html',
  styleUrls: ['./list-proveedor.component.css'],
})
export class ListProveedorComponent {
  proveedorService = inject(ProveedorService);
  proveedores: Proveedor[];
  dtOptions: DataTables.Settings = {};
  @Output() seeUserDetails: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() id: EventEmitter<bigint> = new EventEmitter<bigint>();
  @Output() rol: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
    this.getProveedores();
  }

  constructor(private router: Router) {}

  getProveedores() {
    this.proveedorService.getProveedores().subscribe({
      next: (data) => {
        this.proveedores = data;
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
    this.rol.emit('PROVEEDOR');
  }

  deleteProveedor(id: bigint) {
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
        this.proveedorService.deleteProveedor(id).subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Usuario eliminado',
              text: 'El proveedor fue eliminado exitosamente',
              icon: 'success',
              timer: 2000,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
            });
            this.getProveedores();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  updateProveedor(id: bigint) {
    this.router.navigate(['/welcome/update-user', id, 'PROVEEDOR']);
  }
}
