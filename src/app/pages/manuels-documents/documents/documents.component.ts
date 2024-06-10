import { Component, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { FiltreWrapper } from 'src/app/@common/wrappers/filtre-wrapper';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  @ViewChild(DatatableComponent) table: DatatableComponent;
nbligne: number = 20;
  loading = true;
  fw = new FiltreWrapper();
  ColumnMode = ColumnMode;
    SelectionType = SelectionType;
}
