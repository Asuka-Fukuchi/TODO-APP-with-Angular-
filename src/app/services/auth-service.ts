import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  login = false;
  userData: User | null = null;
  private logoutTimer: any;

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(user));
        this.login = true;
        this.startAutoLogoutTimer(30 * 60 * 1000);
        this.router.navigate(['home']);
      } else {
        this.userData = null;
        localStorage.removeItem('user');
        this.login = false;
        this.clearLogoutTimer();
        this.router.navigate(['login']);
      }
    });
  }

  private startAutoLogoutTimer(duration: number) {
    this.clearLogoutTimer();
    this.logoutTimer = setTimeout(() => {
      this.SignOut();
    }, duration);
  }

  private clearLogoutTimer() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
  }

  SignUp(email: string, password: string): Observable<any> {
    this.login = true;
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  SignIn(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  SignOut(): void {
    this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userData = null;
      this.login = false;
      this.clearLogoutTimer();
      this.router.navigate(['login']);
    });
  }

  get isLogged(): boolean {
    return !!this.userData;
  }
}