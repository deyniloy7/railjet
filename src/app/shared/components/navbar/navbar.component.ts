import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)

  public isLoggedIn = this.authService.isLoggedIn;
  public currentUser = this.authService.currentUser;

  public login() {
     this.router.navigate(['/auth/login']);
  }

  public logout() {
    this.authService.logout();
  }
}
