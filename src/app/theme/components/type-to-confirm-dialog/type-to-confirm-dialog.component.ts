import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-type-to-confirm-dialog",
  templateUrl: "./type-to-confirm-dialog.component.html",
  styleUrls: ["./type-to-confirm-dialog.component.scss"],
})
export class TypeToConfirmDialogComponent {
  modalTitle: string;
  message: string;
  no: string;
  yes: string;
  returnWord: String = "";
  placeholderMessage = "";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TypeToConfirmDialogComponent>,
    protected translate: TranslateService
  ) {
    this.yes = this.translate.instant(
      data.yes != null ? data.yes : "confirmer"
    );
    this.no = this.translate.instant(data.no != null ? data.no : "annuler");
    this.message = data.message;
    this.modalTitle = data.modalTitle
      ? data.modalTitle
      : this.translate.instant("confirmation...");
    this.placeholderMessage = data.placeholderMessage
      ? data.placeholderMessage
      : this.translate.instant("taper.pour.confirmer");
  }

  confirmer() {
    this.dialogRef.close(this.returnWord);
  }
}
