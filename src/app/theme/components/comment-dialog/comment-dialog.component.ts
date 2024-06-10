import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-comment-dialog",
  templateUrl: "./comment-dialog.component.html",
  styleUrls: ["./comment-dialog.component.scss"],
})
export class CommentDialogComponent {
  title: string = "";
  returnValue: any = "";
  placeholderMessage = "";
  info = "";
  libelle = "";
  modif = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CommentDialogComponent>,
    protected translate: TranslateService
  ) {
    this.title = data.title;
    this.returnValue = data.value;
    this.placeholderMessage = data.placeholder;
    this.info = data.info;
    this.libelle = data.libelle;
    this.modif = data.modif;
  }

  ngOnInit(): void {}

  valider() {
    this.dialogRef.close(this.returnValue);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
