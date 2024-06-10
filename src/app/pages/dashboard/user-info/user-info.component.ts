import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
// import { CustomResponse } from "src/app/@common/models/CustomResponse";
import { Users } from 'src/app/@common/models/users';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { LoginService } from 'src/app/@common/services/login.service';
import { NotificationService } from 'src/app/@common/services/notification.service';

// import { Pays } from "src/app/@common/models/pays";
import { PasswordValidation } from 'src/app/@common/validator/password.validator';
import { LoginRequest } from '../../login/loginRequest';
// import { PaysService } from "../../parametrage/param-generaux/pays/pays.service";
// import { UsersService } from "../../parametrage/utilisateurs-habilitations/users.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  public user: Users;
  form: UntypedFormGroup;
  form2: UntypedFormGroup;
  // customeResponse: CustomResponse;
  // langues: Pays[] = [];
  lang = 'fr';
  constructor(
    private translate: TranslateService,
    // private service: UsersService,
    protected loginService: LoginService,
    // protected paysService: PaysService,
    private spinner: NgxSpinnerService,
    protected notificationService: NotificationService,
    protected fb: UntypedFormBuilder,
    protected localStorageService: LocalStorageService
  ) {
    this.user = new Users();
  }

  ngOnInit(): void {
    this.loginService.account.subscribe((data) => {
      this.user = data;
      // this.paysService.langues().subscribe((data) => {
      //   this.langues = ConstanteService.getDatas(data);
      // });
    });

    this.buildForm();
    this.buildForm2();
  }
  protected buildForm(): void {
    this.form = this.fb.group({
      pseudo: this.fb.control(this.user.nom, [Validators.required]),
      nom: this.fb.control(this.user.nom, [Validators.required]),
      prenom: [this.user.prenom, Validators.required],
      email: this.fb.control(this.user.email, [Validators.required]),
      langue: this.fb.control(this.user.langue, [Validators.required]),
    });
    this.subscribe();
  }
  protected buildForm2(): void {
    this.form2 = this.fb.group(
      {
        login: this.fb.control(this.user.login, [Validators.required]),
        apwd: this.fb.control('', [Validators.required]),
        npwd: this.fb.control('', [Validators.required]),
        cpwd: this.fb.control('', [Validators.required]),
      },
      {
        validator: PasswordValidation.MatchPassword,
      }
    );
    this.subscribe2();
  }
  private subscribe(): void {
    if (!this.form) {
      this.buildForm();
    }
    this.form
      .get('pseudo')
      .valueChanges.subscribe((value) => (this.user.nom = value));
    this.form
      .get('nom')
      .valueChanges.subscribe((value) => (this.user.nom = value));
    this.form
      .get('prenom')
      .valueChanges.subscribe((value) => (this.user.prenom = value));
    this.form
      .get('email')
      .valueChanges.subscribe((value) => (this.user.email = value));
    this.form
      .get('langue')
      .valueChanges.subscribe((value) => (this.user!.langue = value));
  }
  private subscribe2(): void {
    if (!this.form2) {
      this.buildForm2();
    }
  }
  update(): void {
    if (this.user.langue && this.user.langue != '') {
      this.lang = this.user.langue;
    }
    this.translate.use(this.lang);
    this.translate.setDefaultLang(this.lang);

    this.user.patronyme = this.user.prenom + ' ' + this.user.nom.toUpperCase();
    // this.spinner.show();
    // this.service.update(this.user.id, this.user).subscribe(
    //   (data) => {
    //     this.loginService.updatedAccount(this.user);
    //     this.notificationService.open(
    //       'succes',
    //       this.translate.instant('msg.update.succes'),
    //       ''
    //     );

    //     this.spinner.hide();
    //   },
    //   (error) => {
    //     this.showError(error);
    //   }
    // );
  }
  initPwd() {
    const loguser = new LoginRequest();
    const fg = this.form2.value;

    loguser.login = this.user.login;
    loguser.mdp = fg.apwd;
    loguser.nmdp = fg.npwd;

    // this.service.changePwd(loguser).subscribe(
    //   (response) => {
    //     if (response != null) {
    //       let r = ConstanteService.getDatas(response);
    //       if (r.msg === 'ok') {
    //         this.notificationService.open(
    //           'succes',
    //           'update.password.succes',
    //           ''
    //         );
    //       } else {
    //         this.notificationService.open('error', r.msg, '');
    //       }
    //     }
    //   },
    //   (error) => {
    //     this.showError(error);
    //   }
    // );
  }

  showError(error): void {
    this.notificationService.open(
      'error',
      ConstanteService.getErrorMessage(error),
      ''
    );
  }
}
