import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  login(): void {
    this.auth.login();
    void this.router.navigate(['/blog/create']);
  }
}
