import { Component, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { FiltreWrapper } from 'src/app/@common/wrappers/filtre-wrapper';

@Component({
  selector: 'app-vie-scolaire',
  templateUrl: './vie-scolaire.component.html',
  styleUrls: ['./vie-scolaire.component.scss']
})
export class VieScolaireComponent {
  @ViewChild(DatatableComponent) table: DatatableComponent;
nbligne: number = 20;
  loading = true;
  fw = new FiltreWrapper();
  ColumnMode = ColumnMode;
    SelectionType = SelectionType;
}
