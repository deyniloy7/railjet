import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../models';
import { AuthApiService } from './auth-api.service';
import { catchError, finalize, lastValueFrom, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authApi = inject(AuthApiService);

  private _currentUser = signal<User | null>(null);
  private _isLoading = signal<boolean>(false);

  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly isLoggedIn = computed(() => !!this._currentUser());
  
  constructor() { }  

  login(email: string, password: string) {
    this.authApi.login(email, password).pipe(
      tap(response => {
        this._currentUser.set(response.user);
      })
    ).subscribe();
  }


  logout() {
    this.authApi.logout().subscribe();
    this._currentUser.set(null);
  }

  restoreSession(): Promise<void> {
    this._isLoading.set(true);
    return lastValueFrom(
      this.authApi.restoreSession().pipe(
        tap(response => {
          this._currentUser.set(response.user);
        }),
        catchError((err) => {
          console.error('Session restore failed', err);
          return of(null);
        }),
        finalize(() => this._isLoading.set(false))
      )
    ).then(() => void 0);
  }
}
