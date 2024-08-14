import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';


export const userGuard: CanActivateFn = (route, state) => {
  
  const _AuthService = inject(AuthService);
  const _Router = inject(Router);
  const role = _AuthService.role;

  if (localStorage.getItem('userToken') !== null && role == 'SystemUser') {

    return true; 

  } else {

    _Router.navigate(['/auth']);
    
    return false;
  }
};
