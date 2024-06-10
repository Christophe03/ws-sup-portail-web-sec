import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { ConstanteService } from 'src/app/@common/services/constante.service';

import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { projectOption } from 'src/environments/project-option';
// import { Transport } from "../../../../@common/models/transport";

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private apiUrl: string;
  private baseOption: any;
  utilisateurDataLink = '../../../assets/data/user.data.json';
  groupeDataLink = '../../../assets/data/user.data.json';

  constructor(
    protected httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.apiUrl = environment.serverUrl;
    this.baseOption = ConstanteService.baseOption();
  }

  address() {
    return '/transport';
  }

  public findAllUtilisateur() {
    return this.httpClient.get<any>(this.utilisateurDataLink).pipe(
      map((data) => {
        return data; //  ;)
      }),
      catchError((error) => {
        console.error('Erreur lors de la requête HTTP :', error);
        return []; // Retourne false en cas d'erreur
      })
    );
  }
  public findAllGroupe() {
    return this.httpClient.get<any>(this.groupeDataLink).pipe(
      map((data) => {
        return data; //  ;)
      }),
      catchError((error) => {
        console.error('Erreur lors de la requête HTTP :', error);
        return []; // Retourne false en cas d'erreur
      })
    );
  }

  // public find(id: number) {
  //   const url = encodeURI(this.apiUrl + this.address() + "/" + id);
  //   return this.httpClient
  //     .get<Transport>(url, this.baseOption)
  //     .pipe(catchError(this.handleError));
  // }

  // public save(entity: Transport) {
  //   const url = encodeURI(this.apiUrl.concat(this.address()));
  //   return this.httpClient
  //     .post(url, JSON.stringify(entity), this.baseOption)
  //     .pipe(catchError(this.handleError));
  // }

  // public update(id: number, entity: Transport) {
  //   const url = encodeURI(this.apiUrl.concat(this.address() + "/" + id));
  //   return this.httpClient
  //     .put(url, JSON.stringify(entity), this.baseOption)
  //     .pipe(catchError(this.handleError));
  // }
  // public delete(id: number) {
  //   const url = encodeURI(this.apiUrl + this.address() + "/" + id);
  //   return this.httpClient
  //     .delete(url, this.baseOption)
  //     .pipe(catchError(this.handleError));
  // }

  // public delete(id: number) {
  //   const url = encodeURI(this.apiUrl + this.address() + "/" + id);
  //   return this.httpClient
  //     .delete(url, this.baseOption)
  //     .pipe(catchError(this.handleError));
  // }

  protected handleError(error) {
    return throwError(error);
  }
}
