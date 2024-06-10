import { Component, OnInit, NgZone, ViewChild, inject } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { projectOption } from 'src/environments/project-option';
import { TranslateService } from '@ngx-translate/core';
import { Users } from 'src/app/@common/models/users';
import {
  Firestore,
  collection,
  getDocs,
} from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { DashboardService } from 'src/app/@common/services/dashboard.service';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { NotificationService } from 'src/app/@common/services/notification.service';
import { LoginService } from 'src/app/@common/services/login.service';
import { DashboardWrapper } from 'src/app/@common/wrappers/dashbord.wrapper';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { FiltreWrapper } from 'src/app/@common/wrappers/filtre-wrapper';
import { Timestamp } from 'firebase/firestore';
import { timestamp } from 'rxjs';
am4core.useTheme(am4themes_animated);
am4core.options.autoSetClassName = true;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  lang = 'fr';
  hide = true;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  private firestore: Firestore = inject(Firestore);
  nbligne: number = 20;
  loading = true;
  fw = new FiltreWrapper();
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  alertesData: any[] = [];
  dossiersoData: any[] = [];
  user: Users;
  universite: string;
  cours: string;
  messages: any[] = [];
  structures: any[] = [];
  model: DashboardWrapper;
  alerts: any[] = [];
  programme: any [] = [];
  constructor(
    private dashboardService: DashboardService,
    protected loginService: LoginService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    protected localStorageService: LocalStorageService,
    private zone: NgZone,
    private datePipe: DatePipe
  ) { }
  rows: any[] = [
    { jour: 'Lundi', matin: '8h - 12h', soir: '14h - 18h' },
    { jour: 'Mardi', matin: '8h - 12h', soir: '14h - 18h' },
    { jour: 'Mercredi', matin: '8h - 12h', soir: '14h - 18h' },
    { jour: 'Jeudi', matin: '8h - 12h', soir: '14h - 18h' },
    { jour: 'Vendredi', matin: '8h - 12h', soir: '14h - 18h' },
    { jour: 'Samedi', matin: '8h - 12h', soir: '14h - 18h' },
    { jour: 'Dimanche', matin: '8h - 12h', soir: '14h - 18h' }
  ];
  async ngOnInit() {
    this.model = new DashboardWrapper();
    try {
      const userDataString = this.localStorageService.getInLocalStorage(projectOption.userKey);
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        // Extraction du nom de l'utilisateur
        this.universite = userData["etablissement"];
        const coursData = userData.cours;
        if (coursData) {
          this.programme = JSON.parse(coursData);
          console.log("les cours des cours", this.programme);
          this.programme.forEach(cours => {
            const jour = cours.jour;
            const matiere = cours.matiere;
            const heureDebut = cours.heure_deb;
            const heureFin = cours.heure_fin;
            const nom = cours.nom;
            const prenom = cours.prenom;
            const salle = cours.salle;
            // Utilisation des valeurs de chaque cours ici selon vos besoins
            console.log("Jour:", jour);
            console.log("Matiere:", matiere);
            console.log("Heure de début:", heureDebut);
            console.log("Heure de fin:", heureFin);
            let nomJour: string;
              switch (jour) {
                case "1":
                  nomJour = "Lundi";
                  break;
                case "2":
                  nomJour = "Mardi";
                  break;
                case "3":
                  nomJour = "Mercredi";
                  break;
                case "4":
                  nomJour = "Jeudi";
                  break;
                case "5":
                  nomJour = "Vendredi";
                  break;
                case "6":
                  nomJour = "Samedi";
                  break;
                default:
                  nomJour = "";
                  break;
            }
            const table = document.querySelector('table tbody');
                  if (table) {
                    const tr = table.querySelector(`tr:nth-child(${jour})`);
                    if (tr) {
                      const tdMatin = tr.children[1];
                      const tdSoir = tr.children[2];
                    // Construire la chaîne de texte avec les détails du cours dans l'ordre spécifié
                      const detailsCours = `${matiere} - ${salle} ${prenom} ${nom} : ${heureDebut} - ${heureFin}`;
                      // Vérifier si le cours est le matin ou le soir et ajouter les détails
                    if (heureDebut < "12:00:00") {
                      tdMatin.textContent = detailsCours;
                    } else {
                      tdSoir.textContent = detailsCours;
                    }
                    }
                  }
                });
          }
          console.log("programme", this.programme);
      }
    } catch (error) {
      console.error("Erreur lors de la création des données :", error);
    }
    try {
      const querySnapshot = await getDocs(collection(this.firestore, "messages_demo"));
      querySnapshot.forEach((doc) => {
        const message = {
          id: doc.id,
          message: doc.data()["message"],
          categorie: doc.data()["categorie"].toUpperCase(),
          sender: doc.data()["sender"],
          timestamp: doc.data()["timestamp"],

          color: doc.data()["color"],
        }
        this.messages.push(message);
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
    console.log(this.messages);
  }
  toggleText(message) {
    message.isExpanded = !message.isExpanded;
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
  formatterDateHeure(dateHeure: string): string {
    // Convertir la chaîne de caractères en objet Date
    const dateObj = new Date(
        parseInt(dateHeure.substring(0, 4)), // Année
        parseInt(dateHeure.substring(4, 6)) - 1, // Mois (janvier est 0)
        parseInt(dateHeure.substring(6, 8)), // Jour
        parseInt(dateHeure.substring(8, 10)), // Heure
        parseInt(dateHeure.substring(10, 12)), // Minute
        parseInt(dateHeure.substring(12, 14)) // Seconde
    );

    // Formater la date et l'heure selon le format demandé
    const dateFormatee = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
    const heureFormatee = `${dateObj.getHours()}:${dateObj.getMinutes()}`;

    // Retourner la date et l'heure formatées
    return `${dateFormatee} ${heureFormatee}`;

  }



}
