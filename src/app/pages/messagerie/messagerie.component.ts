import { Component, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { FiltreWrapper } from 'src/app/@common/wrappers/filtre-wrapper';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.scss']
})
export class MessagerieComponent {
  @ViewChild(DatatableComponent) table: DatatableComponent;
nbligne: number = 20;
  loading = true;
  fw = new FiltreWrapper();
  ColumnMode = ColumnMode;
    SelectionType = SelectionType;

    messages= [
  {
    code: 'ABC123',
    libelle: 'Réunion d équipe',
    contenu: 'La réunion d équipe aura lieu demain à 10h. Assurez-vous d être présent.',
    etat: 'non-lu',
  },
  {
    code: 'XYZ789',
    libelle: 'Rapport mensuel',
    contenu: 'Le rapport mensuel pour le mois dernier est maintenant disponible. Veuillez le consulter.',
    etat: 'lu',
  },
  {
    code: '123DEF',
    libelle: 'Nouvelle publication',
    contenu: 'Une nouvelle publication a été partagée sur le tableau d affichage. Jetez-y un coup d œil.',
    etat: 'non-lu',
  },
  // ... Ajoutez d'autres exemples de messages
];

}
