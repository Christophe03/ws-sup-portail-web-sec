import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-confirm-dialog-with-yes",
  templateUrl: "./confirm-dialog-with-yes.component.html",
  styleUrls: ["./confirm-dialog-with-yes.component.scss"],
})
export class ConfirmDialogWithYesComponent {
  modalTitle: string;
  message: string;
  no: string;
  yes: string;
  waitTime: number; //Temps d'attente en milliseconde
  secondes: number;
  waiting: boolean = true;
  yesTexte: String = "";
  tapermessage: String = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected translate: TranslateService
  ) {
    this.message = data.message;
    this.waitTime = data.waitTime != null ? data.waitTime : 5000;
    this.secondes = this.waitTime / 1000;
    this.modalTitle = this.translate.instant(
      data.modalTitle != null ? data.modalTitle : "confirmation..."
    );
    this.yes = this.translate.instant(data.yes != null ? data.yes : "oui");
    this.no = this.translate.instant(data.no != null ? data.no : "annuler");
    this.tapermessage = this.translate.instant("taper.oui.pour.valider");
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let boucleId = setInterval(() => this.calc(), 1000);

    setTimeout(() => {
      clearInterval(boucleId);
      {
        this.waiting = false;
      }
    }, this.waitTime);
  }

  calc() {
    this.secondes--;
  }
}
