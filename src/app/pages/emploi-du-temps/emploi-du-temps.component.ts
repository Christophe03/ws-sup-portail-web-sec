import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { FiltreWrapper } from 'src/app/@common/wrappers/filtre-wrapper';
import { animate, style, transition, trigger } from '@angular/animations';
import { EventData } from 'src/app/@common/models/eventData';
import { JourEvenement } from 'src/app/@common/models/jourEvenement';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { LoginService } from 'src/app/@common/services/login.service';
import { projectOption } from 'src/environments/project-option';
@Component({
  selector: 'app-emploi-du-temps',
  templateUrl: './emploi-du-temps.component.html',
  styleUrls: ['./emploi-du-temps.component.scss']
})
export class EmploiDuTempsComponent implements OnInit {
  years: any[] = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  nbligne: number = 20;
  loading = true;
  fw = new FiltreWrapper();
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  showMonth: any;
  showYear: number;
  events: EventData[] = [];
    programme: any [] = [];
  startDateValue: Date = new Date();
  startYearValue: number = 1900;
  days: EventData[] = [];
  constructor(
    protected loginService: LoginService,
    protected localStorageService: LocalStorageService,
  ) {}
  ngOnInit() {

    try {
      const userDataString = this.localStorageService.getInLocalStorage(projectOption.userKey);
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const coursData = userData.cours;
        console.log(coursData);
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




    this.showYear = this.startDateValue.getFullYear();
    this.showMonth = this.startDateValue.getMonth();
    this.buildYears();
    this.lookupEventData();
    this.buildDays();
  }
  get startDate(): Date {
    return this.startDateValue;
  }
  @Input() dataSource: EventData[] = [];
  set startDate(value: Date) {
    this.startDateValue = value;
    this.showYear = this.startDateValue.getFullYear();
    this.showMonth = this.startDateValue.getMonth();
    this.lookupEventData();
    this.buildDays();
  }
  get startYear(): number {
    return this.startYearValue;
  }
  set startYear(value: number) {
    this.startYearValue = value;
    this.buildYears();
  }
  buildYears() {
    this.years = [];
    for (let i = this.startDate.getFullYear() + 1; i > this.startYear; i--) {
      this.years.push(i);
    }
  }
  previousMonth() {
    this.startDate = new Date(this.showYear, this.showMonth - 1, 1);
  }
  nextMonth() {
    this.startDate = new Date(this.showYear, this.showMonth + 1, 1);
  }
  today() {
    this.startDate = new Date();
  }
  buildDays() {
    // Implémentez votre logique pour construire les jours ici
    this.days = [];
    let premierJourDuMoisEnCours = new Date(this.showYear, this.showMonth, 1);
    let dernierJourDuMoisPrecedent = new Date(this.showYear, this.showMonth, 0);
    let dernierJourDuMoisEnCours = new Date(this.showYear, this.showMonth + 1, 0);
    let premierJourDuMoisSuivant = new Date(this.showYear, this.showMonth + 1, 1);

    let positionPremierJour = premierJourDuMoisEnCours.getDay();
    let positionDernierJour = dernierJourDuMoisEnCours.getDay();

    if (positionPremierJour !== 0) {
      let dernierJourDuMoisPrecedentTemp = dernierJourDuMoisPrecedent;
      for (let i = positionPremierJour - 1; i >= 0; i--) {
        let jour = new JourEvenement();
        jour.annee = dernierJourDuMoisPrecedentTemp.getFullYear();
        jour.mois = dernierJourDuMoisPrecedentTemp.getMonth();
        jour.date = dernierJourDuMoisPrecedentTemp.getDate();

        jour.evenements = this.getEvenementsParJour(jour.annee, jour.mois, jour.date);

        dernierJourDuMoisPrecedentTemp = new Date(
          dernierJourDuMoisPrecedentTemp.getFullYear(),
          dernierJourDuMoisPrecedentTemp.getMonth(),
          dernierJourDuMoisPrecedentTemp.getDate() - 1);

      }
    }
  }
  getEvenementsParJour(annee: number, mois: number, date: number): EventData[] {
    // Implémentez votre logique pour récupérer les événements par jour ici
    // Par exemple, vous pouvez filtrer les événements pour obtenir ceux qui correspondent à la date spécifiée
    return this.events.filter(event => {
        const eventDate = new Date(event.startDate);
        return eventDate.getFullYear() === annee && eventDate.getMonth() === mois && eventDate.getDate() === date;
    });
}


  lookupEventData() {
    // Mettez en œuvre votre logique pour récupérer les données d'événement ici
  }
}
