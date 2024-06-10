import { Component, Inject } from "@angular/core";
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-snackbar",
  templateUrl: "./snackbar.component.html",
  styleUrls: ["./snackbar.component.scss"],
})
export class SnackbarComponent {
  fermer = "";
  message = "";
  entete = "";
  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    private translate: TranslateService,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
    // console.log(data);
    this.message = data.mess != null ? data.mess : data;
    this.entete = data.entete != null ? data.entete : null;
    this.fermer = this.translate.instant("fermer");
  }
  close() {
    this.snackBarRef.dismiss();
  }
}
