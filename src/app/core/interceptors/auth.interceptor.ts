import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (authService.token()) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authService.token()}`),
    });

    return next(cloned);
  }
  return next(req);
};
