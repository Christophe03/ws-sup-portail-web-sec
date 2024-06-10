import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { LoginService } from '../../@common/services/login.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Observable } from 'rxjs';
import { projectOption } from '../../../environments/project-option';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private localStorageService: LocalStorageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // ENVOI
    const token = this.localStorageService.getInLocalStorage(
      projectOption.tokenKey
    );
    const user = JSON.parse(
      this.localStorageService.getInLocalStorage(projectOption.userKey)
    );
    // console.log(token);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`,
          dossierid: '10',
          userid: user.id,
        },
      });
      // console.log(request);
    }

    // RECEPTION
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 403) {
          this.loginService.logout();
        }
        if (error.status === 500) {
          //Quand le token est expiré
          this.loginService.logout();
        }
        throw error;
      })
    );
  }
}
