import { inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard = () => {
  const router = inject(Router);
  if (localStorage.getItem('token')) {
    return true;
  } else {
    Swal.fire({
      title: 'Advertencia',
      text: 'No ha iniciado sesión',
      icon: 'warning',
      timer: 2000,
      showConfirmButton: false,
    });
    router.navigate(['']);
    return false;
  }
};
