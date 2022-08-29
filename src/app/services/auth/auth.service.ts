import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isloggedIn() {
    return this.getToken() !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
