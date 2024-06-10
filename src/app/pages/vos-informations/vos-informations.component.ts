import { Component, NgZone, ViewChild, inject } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { FiltreWrapper } from 'src/app/@common/wrappers/filtre-wrapper';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  getDocs,
  where,
  query,
} from '@angular/fire/firestore';
import { Timestamp } from 'firebase/firestore';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { getFirestore } from "firebase/firestore";
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { LoginService } from 'src/app/@common/services/login.service';
import { Users } from 'src/app/@common/models/users';
import { DashboardWrapper } from 'src/app/@common/wrappers/dashbord.wrapper';
import { projectOption } from 'src/environments/project-option';
import * as moment from 'moment';
import 'moment/locale/fr';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-vos-informations',
  templateUrl: './vos-informations.component.html',
  styleUrls: ['./vos-informations.component.scss'],
  providers: [DatePipe]

})
export class VosInformationsComponent {
  lang = 'fr';
  hide = true;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  private firestore: Firestore = inject(Firestore);
  nbligne: number = 20;
  user: Users;
  loading = true;
  universite: string;
  fw = new FiltreWrapper();
  ColumnMode = ColumnMode;
  model: DashboardWrapper;
  SelectionType = SelectionType;
  userData: any[] = [];
  notes: string;
  seconds: number;
  columnDateNaiss: string;
  constructor(
    protected loginService: LoginService,
    private translate: TranslateService,
    protected localStorageService: LocalStorageService,
    private zone: NgZone,
    private datePipe: DatePipe
  ) { }
  ngOnInit(): void {
    const userDataString = this.localStorageService.getInLocalStorage(projectOption.userKey);
    console.log(userDataString)
    if (userDataString) {

      const userData = JSON.parse(userDataString);

      this.user = userData;
      console.log("Date de Naissance", this.user.date_naiss);
    }
  }

  convertirTimestampEnDate(timestamp: number) {
    // Créer un objet Date à partir du timestamp (en millisecondes)
    const date = new Date(timestamp * 1000);

    // Extraire les composantes de la date
    // Retourner la date formatée
    return date;
}

 formatDate(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  formatDateTimestamp(timestamp: string): string {
    const date = new Date(parseInt(timestamp)); // Assurez-vous que votre timestamp est en millisecondes
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // Pour afficher l'heure au format 24 heures
    };
    // Formater la date en utilisant les options spécifiées
    return date.toLocaleDateString('fr-FR', options);
  }
}
