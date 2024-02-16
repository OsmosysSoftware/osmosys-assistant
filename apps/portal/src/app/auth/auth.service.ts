import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequestBody } from './auth.interface';
import { environment } from '../../environments/environment';

const SESSION_EXPIRATION_DAYS = 30;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = null;

  token = '';

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    const userDataString = localStorage.getItem('userData');
    this.userData = userDataString ? JSON.parse(userDataString) : null;
    this.token = localStorage.getItem('token') || '';

    if (!this.userData) {
      return false;
    }

    const loggedAt = localStorage.getItem('loggedAt');

    if (loggedAt) {
      const expirationDate = new Date(loggedAt);
      expirationDate.setDate(expirationDate.getDate() + SESSION_EXPIRATION_DAYS);
      const currentTime = new Date();
      return currentTime.getTime() < expirationDate.getTime();
    }

    return true;
  }

  // TODO: Add type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loginUser(data: LoginRequestBody): Observable<any> {
    // Adjust the return type based on your API response
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  getToken(): string {
    return this.token;
  }
}
