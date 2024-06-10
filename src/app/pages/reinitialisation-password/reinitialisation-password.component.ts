import { Component } from '@angular/core';
import { getAuth, confirmPasswordReset } from '@angular/fire/auth';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { projectOption } from 'src/environments/project-option';
import { NotificationService } from '../../@common/services/notification.service';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';

@Component({
  selector: 'app-reinitialisation-password',
  templateUrl: './reinitialisation-password.component.html',
  styleUrls: ['./reinitialisation-password.component.scss']
})
export class ReinitialisationPasswordComponent {
public settings: Settings;
  public form: UntypedFormGroup;
  private auth = getAuth();
  private actionCode: string | null = null;

  constructor(
    public fb: UntypedFormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    protected translate: TranslateService,
    public notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    public appSettings: AppSettings,
  ) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      password: ["", Validators.compose([Validators.required, Validators.minLength(6)])], // Nouveau mot de passe
    });
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.actionCode = params['oobCode'];
    });
  }

  async updatePassword() {
    if (!this.actionCode) {
      this.notificationService.open('error', 'Code de réinitialisation manquant.', '');
      return;
    }

    const fg = this.form.value;
    this.spinner.show();
    try {
      await confirmPasswordReset(this.auth, this.actionCode, fg.password);
      this.notificationService.open('success', 'Votre mot de passe a été mis à jour avec succès!', '');
      this.router.navigate([projectOption.loginLink]);
    } catch (error) {
      this.notificationService.open('error', 'Erreur lors de la mise à jour du mot de passe: ' + error.message, '');
      console.error('Error updating password:', error);
    } finally {
      this.spinner.hide();
    }
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}
