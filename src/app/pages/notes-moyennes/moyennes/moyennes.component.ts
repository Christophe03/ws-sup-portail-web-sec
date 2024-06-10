import { Component, ViewChild, inject } from '@angular/core';
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
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { LoginService } from 'src/app/@common/services/login.service';
import { Users } from 'src/app/@common/models/users';
import { DashboardWrapper } from 'src/app/@common/wrappers/dashbord.wrapper';
import { projectOption } from 'src/environments/project-option';

@Component({
  selector: 'app-moyennes',
  templateUrl: './moyennes.component.html',
  styleUrls: ['./moyennes.component.scss']
})
export class MoyennesComponent {
  lang = 'fr';
  hide = true;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  private firestore: Firestore = inject(Firestore);
  nbligne: number = 20;
  user: any;
  rows: any[] = [];
  rows1: any[] = [];
  evaluation1: any[] = [];
  evaluation2: any[] = [];
  loading = true;
  fw = new FiltreWrapper();
  ColumnMode = ColumnMode;
  model: DashboardWrapper;
  userData: any[] = [];
  SelectionType = SelectionType;
  selectedMatiere: any;
  listNote: any;
  note: any;
  selectedAllMatiere: any;
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
      let listNote = {
        semestre1: [],
        semestre2: [],
      };
      // Vérification et extraction des notes si elles existent
      if (userData && userData['notes']) {
        const notes = JSON.parse(userData['notes']);
        // Parcourir chaque ligne de données
        for (const note of notes) {
          // Vérifier le semestre de la note
          if (note.semestre === 1) {
            // Si le semestre est 1, ajouter la note au tableau du semestre 1
            listNote.semestre1.push(note);
          } else if (note.semestre === 2) {
            // Si le semestre est 2, ajouter la note au tableau du semestre 2
            listNote.semestre2.push(note);
          }
          this.rows = listNote.semestre1;
          this.rows1 = listNote.semestre2;
        }
        console.log("notes Liste", listNote.semestre1[0]);
        listNote.semestre1.forEach((noteSem1)=> {
          noteSem1.notes = JSON.parse(noteSem1.notes);
          console.log(noteSem1);
        })
        console.log("notes", this.rows["notes"]);
         listNote.semestre2.forEach((noteSem2)=> {
          noteSem2.notes = JSON.parse(noteSem2.notes);
          console.log(noteSem2);
        })
      };
      
    } else {
      console.log("Aucune donnée de notes n'a été trouvée dans userData");
    }
  }

  formatDate(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
// Fonction pour récupérer les évaluations en fonction de la matière sélectionnée


