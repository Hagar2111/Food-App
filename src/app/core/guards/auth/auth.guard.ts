import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const _Router = inject(Router);

  if (localStorage.getItem('userToken') !== null) {

    return true; // User is authenticated

  } else {

    // User is not authenticated, redirect to login page
    
    _Router.navigate(['/auth']);
    
    return false;
  }
};
