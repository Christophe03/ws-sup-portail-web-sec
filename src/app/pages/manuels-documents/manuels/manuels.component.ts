import { Component, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { FiltreWrapper } from 'src/app/@common/wrappers/filtre-wrapper';

@Component({
  selector: 'app-manuels',
  templateUrl: './manuels.component.html',
  styleUrls: ['./manuels.component.scss']
})
export class ManuelsComponent {
@ViewChild(DatatableComponent) table: DatatableComponent;
nbligne: number = 20;
  loading = true;
  fw = new FiltreWrapper();
  ColumnMode = ColumnMode;
    SelectionType = SelectionType;
}
