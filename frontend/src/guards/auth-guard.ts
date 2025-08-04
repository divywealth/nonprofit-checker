import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    // ❌ No token → redirect to login
    this.router.navigate(['/login']);
    this.router.navigate(['/register']);
    return false;
  }
}

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      // User is already logged in → redirect to home
      this.router.navigate(['/']);
      return false;
    }
    return true; // No token → allow access
  }
}