import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../models';
import { AuthApiService } from './auth-api.service';
import { catchError, finalize, lastValueFrom, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authApi = inject(AuthApiService);
  private readonly _currentUser = signal<User | null>(null);
  private readonly _isLoading = signal<boolean>(false);

  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly isLoggedIn = computed(() => !!this._currentUser());
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin')
  
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
