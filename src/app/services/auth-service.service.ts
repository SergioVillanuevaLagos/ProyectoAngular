import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('user'));
  isLoggedIn$ = this.loggedIn.asObservable();

  login(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
  }
}

