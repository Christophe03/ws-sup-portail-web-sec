import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { SharedModule } from "../../shared/shared.module";
import { DashboardComponent } from "./dashboard.component";
import { UserInfoComponent } from "./user-info/user-info.component";
import { InfoCardsComponent } from "./info-cards/info-cards.component";
import { AlertMessagesComponent } from "./alert-messages/alert-messages.component";
import { InfoActivitesComponent } from './info-activites/info-activites.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
// import { NgxChartsModule } from "@swimlane/ngx-charts";
export const routes: Routes = [
  { path: "", component: DashboardComponent, pathMatch: "full", data: { skipLocationChange: true } },
  {
    path: "user-info",
    component: UserInfoComponent,
    data: { breadcrumb: "profile", backLink: "", skipLocationChange: true },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxChartsModule,
    PerfectScrollbarModule,
    SharedModule,
  ],
  declarations: [

    DashboardComponent,
    InfoCardsComponent,
    AlertMessagesComponent,
    InfoActivitesComponent,
    UserInfoComponent,
  ],
})
export class DashboardModule { }
