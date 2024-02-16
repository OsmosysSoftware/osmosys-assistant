import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve your token from where you store it (e.g., localStorage)
    const authToken = this.auth.getToken();

    // If the token exists, clone the request and add the authorization header
    if (authToken) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`),
      });

      // Pass on the cloned request instead of the original request.
      return next.handle(authReq);
    }

    // If no token, pass on the original request
    return next.handle(request);
  }
}
