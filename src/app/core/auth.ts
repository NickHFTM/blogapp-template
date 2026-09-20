import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly isLoggedIn = signal(localStorage.getItem('isLoggedIn') === 'true');

  login(): void {
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn.set(true);
  }
}
