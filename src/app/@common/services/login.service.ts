import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { projectOption } from '../../../environments/project-option';
import { ConstanteService } from '../services/constante.service';
import { LocalStorageService } from '../services/local-storage.service';
import { LoginRequest } from 'src/app/pages/login/loginRequest';
import { LoginResponse } from 'src/app/pages/login/loginResponse';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  getUserCredential() {
    throw new Error('Method not implemented.');
  }
  private apiUrl: string;
  private baseOption: any;
  account: BehaviorSubject<any>;
  userDataLink = '../../../assets/data/user.data.json';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.apiUrl = environment.serverUrl;
    this.baseOption = ConstanteService.baseOption();
    this.account = new BehaviorSubject({});
  }
  updatedAccount(data: Users) {
    this.account.next(data);
  }
  address() {
    return '/auth';
  }

  login(user: LoginRequest) {
    // console.log(user);
    const url = encodeURI(this.apiUrl + '/users/login');
    return this.httpClient
      .post<any>(url, JSON.stringify(user), this.baseOption)
      .pipe(catchError(this.handleError));
  }

  loginDemo(user: LoginRequest): Observable<boolean> {
    return this.httpClient.get<any>(this.userDataLink).pipe(
      map((data) => {
        // console.log(data);
        this.localStorageService.saveInLocalStorage(
          projectOption.userKey,
          JSON.stringify(data[0])
        );
        this.updatedAccount(data[0]);
        return !!data; // Retourne true si data est existe, sinon false ;)
      }),
      catchError((error) => {
        console.error('Erreur lors de la requête HTTP :', error);
        return of(false); // Retourne false en cas d'erreur
      })
    );
  }

  //  loginDemo(user: LoginRequest): Observable<boolean> {
  //   // On va mettre le user et les menus dans le local storage
  //   this.httpClient.get<any>(this.userDataLink).subscribe(
  //     (data) => {
  //       console.log(data);
  //       if (data) return false;
  //       return false;
  //     },
  //     (error) => {
  //       return false;
  //     }
  //   );

  //   // fetch(this.userDataLink).then(res => res.json())
  //   // .then(json => {
  //   //   let data = json;
  //   // }
  //   // );

  //   // return false;
  // }

  logout() {
    this.localStorageService.removeInLocalStorage(projectOption.tokenKey);
    if (this.localStorageService.getInLocalStorage(projectOption.userKey)) {
      this.localStorageService.removeInLocalStorage(projectOption.userKey);
    }
    if (
      this.localStorageService.getInLocalStorage(projectOption.userRolesKey)
    ) {
      this.localStorageService.removeInLocalStorage(projectOption.userRolesKey);
    }
    this.router.navigate([projectOption.loginLink]);
  }
  newpassword(user: LoginRequest) {
    const url = encodeURI(this.apiUrl + '/users/newpassword');
    return this.httpClient
      .post<LoginResponse>(url, JSON.stringify(user), this.baseOption)
      .pipe(catchError(this.handleError));
  }

  public isLoggedIn() {
    if (this.localStorageService.getInLocalStorage(projectOption.tokenKey)) {
      return true;
    }
    // if (this.localStorageService.getInLocalStorage(projectOption.userKey)) {
    //   return true;
    // }
    if (
      this.localStorageService.getInLocalStorage(projectOption.userRolesKey)
    ) {
      return true;
    }
    return false;
  }
  public getMenus(id: number) {
    const url = encodeURI(this.apiUrl + this.address() + '/roles/' + id);
    return (
      this.httpClient
        // .get<Menus>(url, this.baseOption) // à mètrre
        .get<any>(url, this.baseOption) // juste pour le teste pour l'instant
        .pipe(catchError(this.handleError))
    );
  }
  // public findDossier(dossier: string) {
  //   const url = encodeURI(this.apiUrl + this.address() + "/getDossierId/" + dossier);
  //   return this.httpClient
  //     .get<Societes>(url, this.baseOption)
  //     .pipe(catchError(this.handleError));
  // }
  // public getDefaultDossier() {
  //   const url = encodeURI(this.apiUrl + this.address() + "/getDefaultDossier/");
  //   return this.httpClient
  //     .get<Societes>(url, this.baseOption)
  //     .pipe(catchError(this.handleError));
  // }
  protected handleError(error) {
    return throwError(error);
  }
}
