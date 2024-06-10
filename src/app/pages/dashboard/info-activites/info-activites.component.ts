import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { DashboardWrapper } from 'src/app/@common/wrappers/dashbord.wrapper';

@Component({
  selector: 'app-info-activites',
  templateUrl: './info-activites.component.html',
  styleUrls: ['./info-activites.component.scss']
})
export class InfoActivitesComponent {
  @Input()
  model: DashboardWrapper;
  public typeActivite: string = "TOUS";
  activites: any[] = [];
  ColumnMode = ColumnMode;
  nbligne = 10;
  rows = [];
  pipe = new DatePipe("en-US");
  constructor(
    private router: Router,
  ) {

  }

  load() {
    // this.activites = [];
    // this.wactivite.responsableId = this.user.employe.id;
    // this.wactivite.datedebut = this.pipe.transform(new Date(), "yyyy-MM-dd");
    // this.sActivite.search(this.wactivite).subscribe((data) => {
    //   this.activites = ConstanteService.getDatas(data);
    //   // this.activites = this.alist.filter((f) => f.nature == "A");
    //   this.rows = this.activites;
    // });
  }

  filter(nature: string): void {
    if (nature === "TOUS") {
      this.rows = this.activites;
    } else {
      this.rows = this.activites.filter((f) => f.nature === nature);
    }
  }

  edit(row) {
    this.router.navigateByUrl("/profile/schedule");
  }

}
