import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthResponse, User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly mockUser: User = {
    id: 'user1',
    name: 'Jon',
    age: 30,
    email: 'test@test.com',
    gender: 'male',
    phoneNumber: '1234',
    role: 'admin',
  };

  private readonly authResponse: AuthResponse = {
    token: 'abcd-1234',
    refreshToken: 'abcd',
    expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    user: this.mockUser,
  };

  constructor() {}

  login(email: string, password: string): Observable<AuthResponse> {
    return of(this.authResponse);
  }

  logout(): Observable<void> {
    return of(void 0);
  }

  restoreSession(): Observable<AuthResponse> {
    return of(this.authResponse);
  }
}
