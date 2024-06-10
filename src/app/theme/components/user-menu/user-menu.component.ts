import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Users } from 'src/app/@common/models/users';
import { CommonService } from 'src/app/@common/services/common.service';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { LoginService } from 'src/app/@common/services/login.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {
  public userImage: any = '../assets/img/users/user.jpg';
  public user: Users;
  // keycloak: any;
  constructor(
    protected translate: TranslateService,
    protected loginService: LoginService,
    public cService: CommonService,
    protected localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.loginService.account.subscribe((data) => {
      this.user = data;
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.userImage = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  openHelp() {
    window.open('http://sitaninfo.com/emeeting.net:', '_blank');
  }
  logout() {
    this.loginService.logout();
  }
}
