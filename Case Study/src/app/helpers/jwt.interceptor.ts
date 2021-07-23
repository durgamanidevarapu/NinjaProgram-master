import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + currentUser.token
        }
      });
    }
    return next.handle(request);
  }
}
