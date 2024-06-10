import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Users } from 'src/app/@common/models/users';
import { CommonService } from 'src/app/@common/services/common.service';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { projectOption } from 'src/environments/project-option';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import {
  Firestore,
  collection,
  getDocs,
  where,
  query,
} from '@angular/fire/firestore';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService],
})
export class SidenavComponent implements OnInit {
  public userImage: any = '../assets/img/users/user.jpg';
  public settings: Settings;
  public user: Users;
  nom: string;
  prenom: string;
  formation: string;
  sexe: string;
  code: string;
  avatar: string;
  private firestore: Firestore = inject(Firestore);
  keycloak: any;
  userData: any[] = [];
  name: string;
  constructor(
    public appSettings: AppSettings,
    protected translateService: TranslateService,
    protected localStorageService: LocalStorageService,
    public cService: CommonService
  ) {
    this.settings = this.appSettings.settings;
  }
  async ngOnInit() {
    // Récupération des informations de l'utilisateur depuis le stockage local
    const userDataString = this.localStorageService.getInLocalStorage(projectOption.userKey);
    // Vérification si les données de l'utilisateur existent
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      // Extraction du nom de l'utilisateur
      this.nom = userData["nom"];
      this.prenom = userData["prenom"];
      this.formation = userData["formation"];
      this.code = userData["code"];
      this.sexe = userData["sexe"];

      this.avatar = userData.avatar;
      this.user = JSON.parse(
        this.localStorageService.getInLocalStorage(projectOption.userKey)
      );
      this.avatar = userData.avatar;
      this.user = JSON.parse(
        this.localStorageService.getInLocalStorage(projectOption.userKey)
      );
      // Set the title based on the user's sex
      let title: string;
      if (this.sexe === 'F') {
        title = 'Mlle';
      } else {
        title = 'Mr';
      }
      // Combine the title and the user's name
      this.name = `${title} ${this.prenom} ${this.nom}`;
    }
    const userEmail = this.user.email;
    try {
      const querySnapshot = await getDocs(query(collection(this.firestore, "students_esg"), where("email", "==", userEmail)));
      this.userData = [];
      querySnapshot.forEach((doc) => {
        const userDataItem = {
          id: doc.id,
          formation: doc.data()["formation"]
        };
        this.userData.push(userDataItem);
      });
      localStorage.setItem('userData', JSON.stringify(this.userData));
    } catch (error) {
    }
  }
}
