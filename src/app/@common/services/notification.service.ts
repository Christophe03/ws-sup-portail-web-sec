import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatLegacySnackBar as MatSnackBar } from "@angular/material/legacy-snack-bar";
import { TranslateService } from '@ngx-translate/core';
import { SnackbarComponent } from 'src/app/theme/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private snackBar: MatSnackBar,
    public translate: TranslateService
  ) {}

  open(type, message, action, duration?) {
    this.snackBar.open(this.translate.instant(message), action, {
      duration: duration ? duration : 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['app-snackbar-' + type],
    });
  }
  openWithParam(type, message, option, action, duration?) {
    this.snackBar.open(this.translate.instant(message, option), action, {
      duration: duration ? duration : 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['app-snackbar-' + type],
    });
  }
  openSnackBar(panelClass: string, message: string, option, action, duration?) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data:
        panelClass != 'infos'
          ? this.translate.instant(message, option)
          : {
              mess: this.translate.instant(message.split('***')[1], option),
              entete: this.translate.instant(message.split('***')[0], option),
              canClose: true,
            },
      panelClass: ['app-snackbar-' + panelClass],
      duration: duration ? duration : 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
