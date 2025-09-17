import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth-service';

export const guardAppGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.isLogged) {
    return true;
  } else {
    alert('Please log in first'); 
    return false;
  }
};