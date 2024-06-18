import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { RouteGuardService } from './route-guard.service';
import { inject } from '@angular/core';

export const routeGuard: CanActivateFn = (route, state) => {
  const service = inject(RouteGuardService);
  const router = inject(Router);

  if (service.auth) {
    console.log(service.auth);
    return service.auth;
  }

  return router.navigate(['/login']);
  
};
