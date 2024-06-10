import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { LoginService } from 'src/app/@common/services/login.service';
import { NotificationService } from 'src/app/@common/services/notification.service';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { LoginRequest } from '../login/loginRequest';
// import { emailValidator } from 'src/app/theme/utils/app-validators';
import { LoginResponse } from '../login/loginResponse';
import { projectOption } from 'src/environments/project-option';
import { getAuth, sendPasswordResetEmail, confirmPasswordReset  } from '@angular/fire/auth';
import { emailValidator } from 'src/app/theme/utils/app-validators';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {
  public settings: Settings;
  public form: UntypedFormGroup;
  private auth = getAuth();

  constructor(
    public fb: UntypedFormBuilder,
    public router: Router,
    protected translate: TranslateService,
    public notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    public appSettings: AppSettings,
  ) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      email: ["", Validators.compose([Validators.required, emailValidator])],
    });
  }

  async sendResetEmail() {
    const fg = this.form.value;
    this.spinner.show();
    try {
      await sendPasswordResetEmail(this.auth, fg.email);
      this.notificationService.open('success', 'Un email de réinitialisation de mot de passe a été envoyé!', '');
    } catch (error) {
      this.notificationService.open('error', 'Erreur lors de l\'envoi de l\'email de réinitialisation: ' + error.message, '');
      console.error('Error sending reset email:', error);
    } finally {
      this.spinner.hide();
    }
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}
