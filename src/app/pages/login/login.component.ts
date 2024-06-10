import { Component, inject } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { LoginService } from 'src/app/@common/services/login.service';
import { NotificationService } from 'src/app/@common/services/notification.service';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { projectOption } from 'src/environments/project-option';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  getDocs,
  where,
  query,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form: UntypedFormGroup;
  public settings: Settings;
  lang = 'fr';
  hide = true;
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  connecting = false;
  constructor(
    public appSettings: AppSettings,
    public fb: UntypedFormBuilder,
    public router: Router,
    private loginService: LoginService,
    protected translate: TranslateService,
    private localStorageService: LocalStorageService,
    public notificationService: NotificationService,
    private spinner: NgxSpinnerService
  ) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      login: ['wwebschool@gmail.com', Validators.compose([Validators.required])],
      password: ['0123456', Validators.compose([Validators.required])],
    });
  }
  async login() {
  this.connecting = true;
  const fg = this.form.value;

  try {
    const userCredential = await signInWithEmailAndPassword(this.auth, fg.login, fg.password);
    const user = userCredential.user;

    const docRefU = doc(this.firestore, "users", user.uid);
    const docSnapU = await getDoc(docRefU);

    if (docSnapU.exists()) {
      const u = docSnapU.data();
      console.log(u);
      console.log(u['sid']);

      // On recupère le document du user qui s'est connecté
      const docRef = doc(this.firestore, `students_${u['sid']}`, user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const q = query(collection(this.firestore, `students_${u['sid']}`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
        });

        this.localStorageService.saveInLocalStorage(
          projectOption.userKey,
          JSON.stringify(docSnap.data())
        );

        this.notificationService.open('succes', "Connexion effectuée avec succès!", '');
        this.router.navigate([projectOption.firstLink]);
      } else {
        this.connecting = false;
        this.notificationService.open('error', 'Erreur: Utilisateur non trouvé dans l\'établissement.', '');
      }
    } else {
      this.connecting = false;
      this.notificationService.open('error', 'Erreur: Utilisateur non trouvé.', '');
    }
  } catch (error) {
    this.connecting = false;
    this.notificationService.open('error', 'Une erreur est survenue: ' + error.message, '');
    console.error('Error during login:', error);
  }
}

  newPassword() {
    this.router.navigate([projectOption.newPassword]);
  }
  async ngAfterViewInit() {
    try {
      await signOut(this.auth);
      this.clearLocalStorage();
      this.settings.loadingSpinner = false;
    } catch (error) {
      console.error('Error during sign out:', error);
      this.settings.loadingSpinner = false;
      // Ensure spinner is turned off even if there's an error
      if (error.code === 403){
        console.error('permission error:', error.message);
        this.notificationService.open('error', 'Erreur de permission:' + error.message, '');
      } else {
        console.error('Error during sign out', error);
        this.notificationService.open('error', 'Une erreur est survenue lors de la deconnexion', '');
      }
    }

  }
   private clearLocalStorage() {
    const keys = [
      projectOption.tokenKey,
      projectOption.userKey,
      projectOption.userRolesKey,
    ];

    keys.forEach((key) => {
      if (this.localStorageService.getInLocalStorage(key)) {
        this.localStorageService.removeInLocalStorage(key);
      }
    });
  }

  showError(error) {
    this.notificationService.open(
      'error',
      ConstanteService.getErrorMessage(error),
      ''
    );
  }
  myShowError(error) {
    this.notificationService.open('error', error, '');
  }
}
