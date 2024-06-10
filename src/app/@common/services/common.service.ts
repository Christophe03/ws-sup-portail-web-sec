import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { ConstanteService } from './constante.service';
import { HttpClient } from '@angular/common/http';
import { catchError, filter, map, startWith, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Users } from '../models/users';
// import { Users } from "../models/users";

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private apiCoreUrl: string;
  private baseOption: any;

  constructor(
    protected translate: TranslateService,
    protected httpClient: HttpClient
  ) {
    this.apiCoreUrl = environment.serverUrl;
    this.baseOption = ConstanteService.baseOption();
  }

  public findSexe() {
    let items = [];
    items.push({ code: 'M', libelle: this.translate.instant('masculin') });
    items.push({ code: 'F', libelle: this.translate.instant('feminin') });
    items.push({ code: 'A', libelle: this.translate.instant('autre') });
    return items;
  }
  public findEtatCivile() {
    let items = [];
    items.push({ code: 'C', libelle: this.translate.instant('celibataire') });
    items.push({ code: 'M', libelle: this.translate.instant('marie') });
    items.push({ code: 'D', libelle: this.translate.instant('divorce') });
    items.push({ code: 'V', libelle: this.translate.instant('veuf') });
    return items;
  }
  public findNombreEnfant() {
    let items = [];
    for (let i = 0; i <= 10; i++) {
      items.push({ code: i, libelle: i + '' });
    }
    return items;
  }
  public findNiveauEtude() {
    let items = [];
    items.push({ code: 'diplome', libelle: this.translate.instant('diplome') });
    items.push({
      code: 'bachelier',
      libelle: this.translate.instant('bachelier'),
    });
    items.push({ code: 'autre', libelle: this.translate.instant('autre') });
    return items;
  }

  public formatNumber(n): number {
    return n.replace(/[^0-9]/g, '');
  }
  public getPhoto(img, nature, id): Observable<Blob> {
    const url = encodeURI(
      this.apiCoreUrl + '/photo/load/' + img + '/' + nature + '/' + id
    );
    return this.httpClient.get(url, { responseType: 'blob' });
  }
  public uploadPhoto(photo: File, emp, nature, id) {
    const url = encodeURI(
      this.apiCoreUrl + '/photo/upload/' + emp + '/' + nature + '/' + id
    );
    const uploadImageData = new FormData();
    uploadImageData.append('file', photo);
    this.httpClient
      .post(url, uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          console.log('image enregistre avec succes');
        } else {
          console.log('image non enregistre');
        }
      });
  }
  public deletePhoto(emp, nature) {
    const url = encodeURI(
      this.apiCoreUrl + '/photo/delete/' + emp + '/' + nature
    );
    return this.httpClient
      .get(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public eventRappels() {
    let items = [];
    items.push({ code: 'N15M', libelle: this.translate.instant('N15M') });
    items.push({ code: 'N30M', libelle: this.translate.instant('N30M') });
    items.push({ code: 'N1H', libelle: this.translate.instant('N1H') });
    items.push({ code: 'N2H', libelle: this.translate.instant('N2H') });
    items.push({ code: 'N1J', libelle: this.translate.instant('N1J') });
    items.push({ code: 'E3H', libelle: this.translate.instant('E3H') });
    items.push({ code: 'E6H', libelle: this.translate.instant('E6H') });
    return items;
  }
  public eventConfidentialite() {
    let items = [];
    items.push({
      code: 'PU',
      libelle: this.translate.instant('tout.le.monde'),
    });
    items.push({
      code: 'PR',
      libelle: this.translate.instant('moi.seulement'),
    });
    return items;
  }
  public eventPeriodesAnnee() {
    let items = [];
    items.push({ code: 'J', libelle: this.translate.instant('jours') });
    items.push({ code: 'S', libelle: this.translate.instant('semaines') });
    items.push({ code: 'M', libelle: this.translate.instant('mois') });
    items.push({ code: 'A', libelle: this.translate.instant('annees') });
    return items;
  }
  public eventRepetition() {
    let items = [];
    items.push({
      code: 'R',
      libelle: this.translate.instant('nombre.de.repetitions'),
    });
    items.push({ code: 'D', libelle: this.translate.instant('date.fin') });
    items.push({ code: 'T', libelle: this.translate.instant('toujours') });
    return items;
  }
  public findAccounts() {
    const url = encodeURI(this.apiCoreUrl + '/account');
    return this.httpClient
      .get<Users>(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  protected handleError(error) {
    return throwError(error);
  }

  public periodiciteContrat() {
    let items = [];
    items.push({ code: 'N', libelle: this.translate.instant('aucune') });
    items.push({ code: 'M', libelle: this.translate.instant('mensuelle') });
    items.push({ code: 'S', libelle: this.translate.instant('semestrielle') });
    items.push({ code: 'A', libelle: this.translate.instant('annuelle') });
    return items;
  }
  public rappelTypes() {
    let items = [];
    items.push({
      code: -1,
      libelle: this.translate.instant('.veuillez.selectionner.'),
    });
    items.push({ code: 1, libelle: this.translate.instant('repondeur') });
    items.push({ code: 2, libelle: this.translate.instant('occupe') });
    items.push({ code: 3, libelle: this.translate.instant('message') });
    items.push({ code: 4, libelle: this.translate.instant('a.rappeler') });
    items.push({ code: 5, libelle: this.translate.instant('droit.rappeler') });
    items.push({ code: 6, libelle: this.translate.instant('a.relancer') });
    return items;
  }
  public resultatProspections() {
    let items = [];
    items.push({
      code: -1,
      libelle: this.translate.instant('.veuillez.selectionner.'),
    });
    items.push({ code: 0, libelle: this.translate.instant('inconnu') });
    items.push({ code: 1, libelle: this.translate.instant('rdv') });
    items.push({ code: 2, libelle: this.translate.instant('refus') });
    items.push({ code: 3, libelle: this.translate.instant('pas.besoin') });
    items.push({ code: 4, libelle: this.translate.instant('a.recontacter') });
    items.push({ code: 5, libelle: this.translate.instant('mail.envoye') });
    return items;
  }
  public statutsConge() {
    let items = [];
    items.push({ code: 'P', libelle: this.translate.instant('sc.planifiee') });
    items.push({ code: 'S', libelle: this.translate.instant('sc.soumise') });
    items.push({ code: 'V', libelle: this.translate.instant('sc.acceptee') });
    items.push({ code: 'R', libelle: this.translate.instant('sc.rejetee') });
    items.push({ code: 'A', libelle: this.translate.instant('sc.annulee') });
    return items;
  }
  // T:Tous,M:Manager,C:Collaborateur
  public concerneList() {
    let items = [];
    items.push({ code: 'T', libelle: this.translate.instant('tous') });
    items.push({ code: 'M', libelle: this.translate.instant('manager') });
    items.push({ code: 'C', libelle: this.translate.instant('collaborateur') });
    return items;
  }

  public statutsOrdre() {
    let items = [];
    items.push({ code: 'P', libelle: this.translate.instant('sc.planifie') });
    items.push({ code: 'S', libelle: this.translate.instant('sc.soumis') });
    items.push({ code: 'V', libelle: this.translate.instant('sc.valide') });
    items.push({ code: 'R', libelle: this.translate.instant('sc.rejete') });
    items.push({ code: 'F', libelle: this.translate.instant('sc.archive') });
    return items;
  }
  public statutsNoteFrais() {
    let items = [];
    items.push({ code: 'P', libelle: this.translate.instant('planifie') });
    items.push({ code: 'S', libelle: this.translate.instant('soumis') });
    items.push({ code: 'V', libelle: this.translate.instant('att.justif') });
    items.push({
      code: 'A',
      libelle: this.translate.instant('att.valid.justif'),
    });
    items.push({ code: 'J', libelle: this.translate.instant('valide') });

    items.push({ code: 'R', libelle: this.translate.instant('rejete') });
    items.push({ code: 'F', libelle: this.translate.instant('sc.archive') });

    return items;
  }
  public statutsMission() {
    let items = [];
    items.push({
      code: 'P',
      libelle: this.translate.instant('smission.planifiee'),
    });
    items.push({
      code: 'E',
      libelle: this.translate.instant('smission.en.cours'),
    });
    items.push({
      code: 'C',
      libelle: this.translate.instant('smission.cloturee'),
    });
    items.push({
      code: 'A',
      libelle: this.translate.instant('smission.annulle'),
    });
    return items;
  }
  public etatActivite() {
    let items = [];
    items.push({
      code: 'P',
      libelle: this.translate.instant('smission.planifiee'),
    });
    items.push({
      code: 'E',
      libelle: this.translate.instant('smission.en.cours'),
    });
    items.push({
      code: 'C',
      libelle: this.translate.instant('smission.cloturee'),
    });
    items.push({
      code: 'A',
      libelle: this.translate.instant('smission.annulle'),
    });
    return items;
  }
  public domainesModels() {
    let items = [];
    items.push({ code: 'CL', libelle: this.translate.instant('dom.clients') });
    items.push({
      code: 'AG',
      libelle: this.translate.instant('dom.collaborateurs'),
    });
    items.push({ code: 'GC', libelle: this.translate.instant('dom.conges') });
    items.push({
      code: 'TP',
      libelle: this.translate.instant('dom.temps.passe'),
    });
    items.push({ code: 'MI', libelle: this.translate.instant('dom.missions') });
    return items;
  }
  public typePlaning() {
    let items = [];
    items.push({ code: 'C', libelle: this.translate.instant('pl.conge') });
    items.push({ code: 'A', libelle: this.translate.instant('pl.abscence') });
    return items;
  }

  public mois() {
    let items = [];
    items.push({ code: 0, libelle: this.translate.instant('mois.jan') });
    items.push({ code: 1, libelle: this.translate.instant('mois.fev') });
    items.push({ code: 2, libelle: this.translate.instant('mois.mar') });
    items.push({ code: 3, libelle: this.translate.instant('mois.avr') });
    items.push({ code: 4, libelle: this.translate.instant('mois.mai') });
    items.push({ code: 5, libelle: this.translate.instant('mois.juin') });
    items.push({ code: 6, libelle: this.translate.instant('mois.juil') });
    items.push({ code: 7, libelle: this.translate.instant('mois.aout') });
    items.push({ code: 8, libelle: this.translate.instant('mois.sep') });
    items.push({ code: 9, libelle: this.translate.instant('mois.oct') });
    items.push({ code: 10, libelle: this.translate.instant('mois.nov') });
    items.push({ code: 11, libelle: this.translate.instant('mois.dec') });
    return items;
  }
  public typeEvenement() {
    let items = [];
    items.push({ code: 'E', libelle: this.translate.instant('te.entree') });
    items.push({ code: 'S', libelle: this.translate.instant('te.sortie') });
    return items;
  }
  public statutActifInactif() {
    let items = [];
    items.push({ code: '1', libelle: this.translate.instant('actif') });
    items.push({ code: '0', libelle: this.translate.instant('inactif') });
    return items;
  }
  public porteEvenement() {
    let items = [];
    items.push({ code: 'V', libelle: this.translate.instant('pe.visiteur') });
    items.push({ code: 'P', libelle: this.translate.instant('pe.personnel') });
    return items;
  }
  public tri() {
    let items = [];
    items.push({
      code: 'ASC',
      libelle: this.translate.instant('tri.croissant'),
    });
    items.push({
      code: 'DESC',
      libelle: this.translate.instant('tri.decroissant'),
    });
    return items;
  }
  public niveauRelanceTempsPasse() {
    let items = [];
    items.push({
      code: '1',
      libelle: this.translate.instant('ts.niveau') + ' 1',
    });
    items.push({
      code: '2',
      libelle: this.translate.instant('ts.niveau') + ' 2',
    });
    return items;
  }
  public heuresTravail() {
    let items = [];
    for (let i = 1; i <= 8; i++) {
      items.push({ code: i, libelle: i + ' H' });
    }
    return items;
  }

  public listUnitesForRubriques() {
    let items = [];

    items.push({ libelle: 'jours' });
    items.push({ libelle: 'unite' });
    items.push({ libelle: 'article' });
    items.push({ libelle: 'litre' });
    items.push({ libelle: 'km' });
    items.push({ libelle: 'kg' });
    items.push({ libelle: 'ticket' });
    items.push({ libelle: 'service' });
    items.push({ libelle: 'autre' });
    return items;
  }
}
