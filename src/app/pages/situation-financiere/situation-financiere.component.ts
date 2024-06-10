import { Component, ViewChild, inject } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { FiltreWrapper } from 'src/app/@common/wrappers/filtre-wrapper';
import {
  Firestore,
} from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { LoginService } from 'src/app/@common/services/login.service';
import { DashboardWrapper } from 'src/app/@common/wrappers/dashbord.wrapper';
import { projectOption } from 'src/environments/project-option';
import { Timestamp } from 'firebase/firestore';
@Component({
  selector: 'app-situation-financiere',
  templateUrl: './situation-financiere.component.html',
  styleUrls: ['./situation-financiere.component.scss']
})
export class SituationFinanciereComponent {
  lang = 'fr';
  hide = true;
  rows: any[] = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  private firestore: Firestore = inject(Firestore);
  nbligne: number = 20;
  user: any;
  loading = true;
  paiements: string;
  fw = new FiltreWrapper();
  ColumnMode = ColumnMode;
  model: DashboardWrapper;
  userData: any[] = [];
  SelectionType = SelectionType;
  paiementData: any[] = [];
  constructor(
    protected loginService: LoginService,
    private translate: TranslateService,
    protected localStorageService: LocalStorageService,
  ) { }
  async ngOnInit() {
    const userDataString = this.localStorageService.getInLocalStorage(projectOption.userKey);
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log("l'utilisateur connecter", userData);
      const paiementsData = userData.paiements;
      console.log("les paiements", paiementsData);
      if (paiementsData) {
        const paiements = JSON.parse(paiementsData);
        this.rows = paiements;
      }
      else { console.log("Paiements data is undefined"); }
    }
  }
  formatDate(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  noSummary(cells: number[]): string {
    return "";
  }
}

